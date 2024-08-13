<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  let count = 1;
  let channelWidth = 6;

  let channelItems = [];
  let lastItemID = channelItems[channelItems.length - 1] ?? 0;

  const writeItem = () => {
    if (channelItems.length === count) return;
    lastItemID++;
    channelItems = [...channelItems, lastItemID];
  };

  const readItem = () => {
    if (channelItems.length === 0) return;
    channelItems.shift();
    channelItems = channelItems;
  };

  const selectBuffered = () => {
    count = 4;
    channelWidth = 21;
    channelItems = [];
    lastItemID = 0;
  };

  const selectUnbuffered = () => {
    count = 1;
    channelWidth = 6;
    channelItems = [];
    lastItemID = 0;
  };
</script>

<div class="component-wrapper">
  <div class="radios">
    <div class="channel-radio">
      <input
        type="radio"
        name="channel-type"
        id="unb-channel"
        checked
        on:change={selectUnbuffered}
      />
      <label for="unb-channel">Arabelleksiz Kanal</label>
    </div>
    <div class="channel-radio">
      <input
        type="radio"
        name="channel-type"
        id="b-channel"
        on:change={selectBuffered}
      />
      <label for="b-channel">Arabellekli Kanal (4)</label>
    </div>
  </div>
  <div class="read-write-btn">
    <button on:click={readItem} disabled={channelItems.length === 0}>
      Değeri oku <br />
      <code>&lt;- ch</code>
    </button>
    <div class="channel-wrapper">
      <div
        class="channel"
        style="--width: {channelWidth}rem; --count: {count};"
      >
        {#each channelItems as item (item)}
          <div
            animate:flip
            in:fly|global={{ x: 100 }}
            out:fly|global={{ x: -100 }}
            class="channel-item"
          >
            msg{item}
          </div>
        {/each}
      </div>
    </div>
    <button on:click={writeItem} disabled={channelItems.length === count}>
      Değeri Yaz <br />
      <code>ch &lt;- "msg{lastItemID + 1}"</code>
    </button>
  </div>

  <div class="channel-title">Kanal</div>
</div>

<style>
  .component-wrapper {
    border: 1px solid gray;
    border-radius: 4px;
    padding: 1rem;
    display: flex;
    margin-top: 2rem;
    flex-direction: column;
    overflow: hidden;
  }

  .component-wrapper * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .radios {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    align-items: center;
  }
  .channel-radio {
    display: flex;
    gap: 0.5rem;
  }

  .read-write-btn {
    display: grid;
    justify-content: space-evenly;
    padding-top: 2rem;
    gap: 2rem;
    grid-template:
      "a c"
      "b b";
  }

  @media (min-width: 768px) {
    .read-write-btn {
      grid-template: "a b b c";
    }
  }

  .read-write-btn code {
    padding: 0.25rem 0.5rem;
  }

  .read-write-btn button {
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }

  .read-write-btn button:first-child {
    grid-area: a;
  }
  .read-write-btn button:last-child {
    grid-area: c;
  }

  .channel-title {
    text-align: center;
    padding-top: 0.5rem;
  }

  .channel-wrapper {
    width: 100%;
    grid-area: b;
    display: flex;
    justify-content: center;
  }
  .channel {
    display: grid;
    grid-template-columns: repeat(var(--count, 4), 1fr);
    gap: 1rem;
    padding: 1rem;
    height: 6rem;
    width: var(--width, 21rem);
    background: darkolivegreen;
    align-self: center;
    border-radius: 0.25rem;
    transition: all 0.5s;
  }

  .channel-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background: coral;
    color: black;
    border-radius: 0.25rem;
    height: 4rem;
    aspect-ratio: 1;
  }
</style>
