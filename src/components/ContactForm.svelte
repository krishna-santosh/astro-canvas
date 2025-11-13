<script lang="ts">
  import { Turnstile } from "svelte-turnstile";

  // To get your congram_token visit https://congram.velopulent.com
  const submitURL = "https://congram.velopulent.com/submit/<congram_token>";

  let submitButton: HTMLButtonElement | null = $state(null);
  let reset: () => void = $state(() => {});
  let success: boolean | null = $state(null);
  let messageTextAreaInFocus: boolean = $state(false);

  const submitForm = async (e: Event) => {
    e.preventDefault();

    if (!submitButton) {
      return;
    }

    submitButton.disabled = true;
    submitButton.innerText = "Sending...";

    const formData = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(formData.entries());

    try {
      const resp = await fetch(submitURL, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (resp.ok) {
        (e.target as HTMLFormElement).reset();
        submitButton.innerText = "Message sent successfully!";
        success = true;
      } else {
        submitButton.innerText = "Failed to Send.";
        success = false;
      }
    } catch (error) {
      submitButton.innerText = "Failed to Send.";
      success = false;
    }

    setTimeout(() => {
      if (!submitButton) {
        return;
      }

      submitButton.innerText = "Send";
      submitButton.disabled = false;
      success = null;
      reset();
    }, 5000);
  };

  let { siteKey }: { siteKey: string } = $props();
</script>

<form
  method="post"
  onsubmit={submitForm}
  class="flex w-full max-w-160 flex-col gap-4"
>
  <input
    type="text"
    name="fullName"
    required
    autocomplete="name"
    placeholder="Your Name"
    class="rounded-sm border border-zinc-700 p-2 transition-colors duration-300 ease-in-out hover:border-zinc-400 focus:border-zinc-400 bg-zinc-900/40"
  />

  <input
    type="email"
    name="email"
    required
    autocomplete="email"
    placeholder="Your Email"
    class="rounded-sm border border-zinc-700 p-2 transition-colors duration-300 ease-in-out hover:border-zinc-400 focus:border-zinc-400 bg-zinc-900/40"
  />

  <textarea
    name="message"
    required
    rows="10"
    placeholder="Message"
    class="rounded-sm border border-zinc-700 p-2 transition-colors duration-300 ease-in-out hover:border-zinc-400 focus:border-zinc-400 bg-zinc-900/40"
    onfocus={() => (messageTextAreaInFocus = true)}
  ></textarea>

  {#if messageTextAreaInFocus}
    <Turnstile {siteKey} theme="dark" bind:reset />
  {/if}

  <button
    bind:this={submitButton}
    type="submit"
    class="w-full rounded-sm border border-zinc-700 bg-zinc-800 py-1"
    class:status-ok={success === true}
    class:status-bad={success === false}
  >
    Send
  </button>

  <p class="text-center text-xs font-semibold text-muted">
    Powered by
    <a
      class="hover:text-primary underline underline-offset-2 transition duration-200 ease-linear"
      target="_blank"
      rel="noopener noreferrer"
      href="https://congram.velopulent.com?utm_source=astro-canvas-demo">Congram</a
    >
  </p>
</form>

<style>
  @reference "../styles/main.css";

  .status-ok {
    @apply border border-green-500;
  }

  .status-bad {
    @apply border border-red-500;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: #fff;
  }
</style>
