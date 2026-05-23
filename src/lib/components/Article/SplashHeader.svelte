<script>
let {kicker, headline, deck, pubDate} = $props();
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cal+Sans&family=Candal&family=Lexend&family=Libre+Baskerville:ital,wght@0,400..700;1,400..700&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Roboto+Mono:wght@600&family=Unbounded:wght@200..900&family=Vollkorn:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">

  <div class="story-header">
    <span class="kicker">{kicker}</span>
    <h1>{headline}</h1>
    <hr class="rule" />
    <p class="deck">{deck}</p>
    <p class="byline">{pubDate}</p>
  </div>

<style>

.kicker {
      display: block;
      font-family: var(--font-serif);
      font-size: var(--font-size-xs);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--color-accent);
      margin-bottom: var(--spacing-sm);
      text-align: center;
    }
 .story-header {
      display: block;
      text-align: center;
      padding: var(--spacing-md) var(--spacing-md);
      background-color: var(--color-btn-bg)
    }

    .story-header h1 {
      display: block;
      color: var(--color-btn-color);
      font-family: var(--font-serif);
      font-size: var(--font-size-6xl);
      font-weight: 400;
      line-height: var(--leading-tight);
      margin-bottom: var(--spacing-xs);
      text-align: center;
    }

    .rule {
      border: none;
      border-top: var(--border-width-accent) solid var(--color-accent);
      align-items: center;
      width: 60px;
      margin: 0 auto var(--spacing-sm);
    }

    .deck {
     font-family: var(--font-menu);
      font-size: var(--font-size-lg);
      line-height: var(--leading-normal);
      color: var(--color-btn-color);
      margin: 0 auto var(--spacing-sm);
      text-align: center;
    }

    .byline {
      font-family: var(--font-serif);
      font-size: var(--font-size-sm);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-accent);
      text-align: center;
      align-items: center;
    }

</style> 