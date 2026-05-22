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
    margin: 0 auto;
    width: 120%;
    max-width: 40rem;
    height: 4rem;
    align-items: center;
    display: block;
    padding: 2rem;
  }

  .site-header {
    border-bottom: 0px solid var(--color-accent);
    box-shadow: 0 2px 4px var(--color-shadow);
  }

  /* Full-width blue background with animated dark-to-light gradient */
  .masthead-wrapper {
    background: #757474;
    height: 13rem;
  }

  /* Compact Masthead - Mobile: centered */
  .masthead {
    align-items: center;
    max-width: var(--max-width-wide);
  }
</style>
