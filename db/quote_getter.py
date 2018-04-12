import requests, time, sqlite3

def main():
    res = []
    for x in range(20):
        r = requests.get('https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json')
        try:
            res.append(r.json())
        except:
            continue
        time.sleep(5)
     
    # DB preparation
    conn = sqlite3.connect('quotes.db')
    c = conn.cursor()
    contrib_name = "James Byrnes"
    contrib_email = "mail@jamesbyrnes.ca"
    for q in res:
        quote_link = q["quoteLink"].strip()
        quote_author = q["quoteAuthor"].strip()
        quote_text = q["quoteText"].strip()
        # Check by URL to see if quote already there
        c.execute("SELECT * FROM quotes WHERE source_url = ?", [quote_link])
        if c.fetchone() is not None:
            print('quote already in db; skipping')
            continue
        # Check to see if author already in DB
        c.execute("SELECT author_id FROM authors WHERE author_name = ?", [quote_author])
        author_row = c.fetchone()
        if author_row is None:
            c.execute("INSERT INTO authors (author_name) VALUES (?)", [quote_author])
            conn.commit()
            c.execute("SELECT author_id FROM authors WHERE author_name = ?", [quote_author])
            author_id = c.fetchone()[0]
        else:
            author_id = author_row[0]
        # Check to see if contrib already in DB
        c.execute("SELECT contributor_id FROM contributors WHERE contributor_email = ?", [contrib_email])
        contrib_row = c.fetchone()
        if contrib_row is None:
            c.execute("INSERT INTO contributors (contributor_name, contributor_email) VALUES (?, ?)", (contrib_name, contrib_email))
            c.execute("SELECT contributor_id FROM contributors WHERE contributor_email = ?", [contrib_email])
            contrib_id = c.fetchone()[0]
        else:
            contrib_id = contrib_row[0]
        c.execute("INSERT INTO quotes (quote, source_url, author_id, contributor_id) VALUES (?, ?, ?, ?)", (quote_text, quote_link, author_id, contrib_id))
    conn.commit()
    c.close()

if __name__ == '__main__':
    main()
