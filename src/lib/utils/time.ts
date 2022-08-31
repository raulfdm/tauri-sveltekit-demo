export function secondsToMinutesFormatted(seconds: number) {
	const minutes = Math.floor(seconds / 60);
	const secondsFormatted = seconds % 60;
	return `${minutes}:${secondsFormatted < 10 ? '0' : ''}${secondsFormatted}`;
}
