# tsuda news

[Click to view!](https://tsuda-news-btsuda11.vercel.app)

## Background
---
**tsuda news** is a live news feed website that allows users to view news articles based on certain categories or searching keywords. It features a beautiful dark mode that toggles between a light and dark UI depending on the user's preference.
<br>

## Technologies Implemented
---
* Next.js 13
* TypeScript
* React
* GraphQL
* Tailwind CSS
<br>

## Features

### Live News Feed
---
**tsuda news** features a live news feed using GraphQL and StepZen to query the media stack API for live news articles. The articles are displayed on the page with those with pictures first followed by the ones without.
<br>
<br>

![](/public/lightMode.png)
<br>
<br>

The `fetchNews` function caches data and prevents frequent fetch requests from being made. The code snippet below handles the logic for the Next.js 13 caching.
<br>
<br>

```typescript
// lib/fetchNews.ts
const res = await fetch('...', {
      method: 'POST',
      cache: isDynamic ? 'no-cache' : 'default',
      next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
      headers: {
          "Content-Type": "application/json",
          Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
          query,
          variables: {
              access_key: process.env.MEDIASTACK_API_KEY,
              categories: category,
              keywords: keywords,
          }
      })
  })
```

### Dark Mode
---
The site auto-defaults to the system preferences of the user. However, you may toggle between a light and dark UI of the website by pressing the corresponding "sun" and "moon" icons in the navigation bar.
<br>
<br>

![](/public/darkMode.png)
<br>
<br>

The code snippet below handles the logic for toggling dark mode. The `useTheme` hook from Next.js keeps track of the current theme of the web page.
<br>
<br>

```typescript
// app/DarkModeButton.tsx
function DarkModeButton() {
  ...
  const { systemTheme, theme, setTheme } = useTheme();
  ...
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div>
        {currentTheme === 'dark' ? (
            <SunIcon 
                className="h-8 w-8 cursor-pointer text-yellow-500"
                onClick={() => setTheme('light')}
            />
        ) : (
            <MoonIcon 
                className="h-8 w-8 cursor-pointer text-gray-900"
                onClick={() => setTheme('dark')}
            />
        )}
    </div>
  )
}
```

### Search By Keyword
---
You may use the search bar to create a live news based on the keywords that you search by. The code snippet below handles the logic for the search input field. The `useState` hook saves the current input field and is pushed into the query string of the URL.
<br>
<br>

```typescript
// app/SearchBox.tsx
...
const [input, setInput] = useState('');
const router = useRouter();

const handleSearch = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!input) return;

  router.push(`/search?term=${input}`);
}
...
```
