<script>
import { base } from '$app/paths';
let menuOpen = $state(false);
</script>

<header class="site-header">
  <div class="masthead-wrapper">
    <div class="masthead">
     <div class="logo">
        <a href={`${base}/`}>  <img src={`${base}/photos/IssueNo.1.png`} alt="NYCity News Service logo"> </a>
      </div>
    </div>
  </div>
</header>

<style lang="scss">
  @use '../../styles' as *;
  .logo {
    margin: 0;
    width: auto;
    max-width: 50rem;
    height: auto;
    padding: 2rem;
  }

  .logo img {
    display: block;
    max-height: 40rem;
    width: auto;
    max-width: 100%;
  }

  .site-header {
    border-bottom: 0px solid var(--color-accent);
    box-shadow: 0 2px 4px var(--color-shadow);
  }

  /* Full-width blue background with animated dark-to-light gradient */
  .masthead-wrapper {
    background: #757474;
    height: 17rem;
  }

  /* Compact Masthead - Mobile: centered */
  .masthead {
    display: flex;
    max-width: var(--max-width-wide);
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
</style>
