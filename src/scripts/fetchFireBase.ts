export default async function fetchFireBase(url: string) {
	const resp = await fetch(url);
	if (!resp.ok) {
		throw new Error('Failed to fetch');
	}
	const data = await resp.json();
	return data || [];
}