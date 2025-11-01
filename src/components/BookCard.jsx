import React from 'react'
export default function BookCard({ book }) {
const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null
return (
<li className="book-card">
{coverUrl ? <img src={coverUrl} alt={`${book.title} cover`} /> : <div className="no-cover">No cover</div>}
<div className="book-info">
<h3>{book.title}{book.subtitle ? `: ${book.subtitle}` : ''}</h3>
<p>{book.author_name ? book.author_name.join(', ') : 'Unknown author'} {book.first_publish_year && `• ${book.first_publish_year}`}</p>
{book.subject && (
<div className="tags">
{book.subject.slice(0, 5).map((tag, i) => (
<span key={i}>{tag}</span>
))}
</div>
)}
<a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noreferrer">View on Open Library ↗</a>
</div>
</li>
)
}