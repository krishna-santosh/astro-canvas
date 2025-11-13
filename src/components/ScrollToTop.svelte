<script lang="ts">
  import type { Snippet } from "svelte";
  import SpotlightButton from "./SpotlightButton.svelte";

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  let isScrolling = $state(false);

  $effect(() => {
    const handleScroll = () => {
      isScrolling = window.scrollY > 0;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
</script>

<div class="fixed bottom-20 right-4 z-50 sm:bottom-8 sm:right-8">
  <SpotlightButton
    aria-label="scroll to top button"
    className={`flex size-10 items-center justify-center p-1 text-muted transition-all duration-200 hover:text-main ${isScrolling ? "opacity-100" : "opacity-0"}`}
    rounded
    onclick={scrollToTop}
  >
    {@render children()}
  </SpotlightButton>
</div>
