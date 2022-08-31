import { createMachine, assign, send } from 'xstate';

type PomodoroMachineContext = {
	overlap: number;
};
type PomodoroMachineEvents =
	| {
			type: 'TOGGLE';
	  }
	| {
			type: 'TICK';
	  }
	| {
			type: 'PAUSE';
	  };

export function createPomodoroMachine(timeInSeconds: number, id: string) {
	return createMachine(
		{
			predictableActionArguments: true,
			id,
			initial: 'idle',
			schema: {
				context: {} as PomodoroMachineContext,
				events: {} as PomodoroMachineEvents
			},
			tsTypes: {} as import('./pomodoro.typegen').Typegen0,
			context: {
				overlap: timeInSeconds
			},
			states: {
				idle: {
					on: {
						TOGGLE: 'running'
					}
				},
				running: {
					invoke: {
						data: (...allStuff) => {
							console.log('LOL', allStuff);
						},
						src: () => (cb) => {
							const intervalId = setInterval(() => {
								cb({ type: 'TICK' });
							}, 1000);

							return () => {
								clearInterval(intervalId);
							};
						}
					},
					on: {
						TOGGLE: 'paused',
						TICK: {
							actions: ['decreaseOverlap']
						}
					}
				},
				paused: {
					on: {
						TOGGLE: 'running'
					}
				},
				end: {}
			}
		},
		{
			actions: {
				decreaseOverlap: assign({
					overlap: (context) => context.overlap - 1
				})
			}
		}
	);
}

type PomodoroTabMachineEvents =
	| {
			type: 'POMODORO';
	  }
	| {
			type: 'BREAK';
	  }
	| {
			type: 'LONG_BREAK';
	  }
	| {
			type: 'TEST';
	  };

export const pomodoroTabMachine = createMachine({
	initial: 'pomodoro',
	schema: {
		events: {} as PomodoroTabMachineEvents
	},
	tsTypes: {} as import('./pomodoro.typegen').Typegen1,
	states: {
		pomodoro: {
			invoke: createPomodoroMachine(25 * 60, 'pomodoro')
		},
		break: {
			invoke: createPomodoroMachine(5 * 60, 'break')
		},
		longBreak: {
			invoke: createPomodoroMachine(15 * 60, 'break')
		}
	},
	on: {
		POMODORO: 'pomodoro',
		BREAK: 'break',
		LONG_BREAK: 'longBreak',
		TEST: {
			actions: () => {
				return send({ type: 'TOGGLE' }, { to: 'pomodoro' });
			}
		}
	}
});
