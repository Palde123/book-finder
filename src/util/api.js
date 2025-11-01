export async function fetchBooks({ title, author, page, signal }) {
const base = 'https://openlibrary.org/search.json'
const params = new URLSearchParams()
params.set('title', title)
if (author) params.set('author', author)
params.set('page', String(page))
params.set('limit', '20')
const res = await fetch(`${base}?${params.toString()}`, { signal })
if (!res.ok) throw new Error(`API error: ${res.status}`)
return res.json()
}