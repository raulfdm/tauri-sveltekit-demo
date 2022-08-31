import { createMachine, assign } from 'xstate';

type TimerContext = {
	overlap: number;
	time: number;
};

type TimerEvents =
	| {
			type: 'TOGGLE';
	  }
	| {
			type: 'CHANGE_TIME';
			time: number;
	  }
	| {
			type: 'CONFIGURE';
	  }
	| {
			type: 'TICK';
	  }
	| {
			type: 'RESET';
	  };

export const timerMachine = createMachine(
	{
		predictableActionArguments: true,
		initial: 'idle',
		context: {
			time: 5 * 60,
			overlap: 5 * 60
		},
		schema: {
			context: {} as TimerContext,
			events: {} as TimerEvents
		},
		tsTypes: {} as import('./timer.typegen').Typegen0,
		states: {
			idle: {
				on: {
					TOGGLE: 'running'
				}
			},
			configuring: {
				on: {
					TOGGLE: 'running'
				}
			},
			running: {
				invoke: {
					src: () => (sendCb) => {
						const intervalId = setInterval(() => {
							sendCb({ type: 'TICK' });
						}, 1000);

						return () => {
							clearInterval(intervalId);
						};
					}
				},
				on: {
					TOGGLE: 'paused',
					TICK: {
						actions: ['decrementOverlap']
					}
				}
			},
			paused: {
				on: {
					TOGGLE: 'running'
				}
			}
		},
		on: {
			CHANGE_TIME: {
				actions: ['changeTime']
			},
			CONFIGURE: {
				target: 'configuring'
			},
			RESET: {
				target: 'idle',
				actions: ['resetOverlap']
			}
		}
	},
	{
		actions: {
			changeTime: assign({
				time: (_, event) => event.time,
				overlap: (_, event) => event.time
			}),
			decrementOverlap: assign({
				overlap: (context) => context.overlap - 1
			}),
			resetOverlap: assign({
				overlap: (context) => context.time
			})
		}
	}
);
