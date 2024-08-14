<script lang="ts">
  let count = 0;

  const addBtn = () => {
    count++;
  };

  const doneBtn = () => {
    if (count === 0) return;
    count--;
  };
</script>

<div class="component-wrapper">
  <div class="left">
    <div class="count-box">
      <span class="num">{count}</span>
      <span class="text"> Beklenilecek Goroutine Sayısı </span>
    </div>
    <div class="buttons">
      <button disabled={count === 0} on:click={doneBtn}> wg.Done() </button>
      <button on:click={addBtn}> wg.Add(1) </button>
    </div>
  </div>

  <div class="traffic-light" class:go={count === 0}>
    <div></div>
    <div></div>

    <b> Wait() </b>
  </div>
</div>

<style>
  .component-wrapper {
    border: 1px solid gray;
    border-radius: 4px;
    padding: 1rem;
    display: flex;
    margin-top: 2rem;
    overflow: hidden;
    gap: 1.5rem;
    align-items: stretch;
    justify-content: center;
  }

  .component-wrapper * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .count-box {
    display: flex;
    justify-content: center;
    align-items: center;
    background: gray;
    padding: 2rem;
    border-radius: 1rem;
    width: 100%;
    flex-direction: column;

    & span.num {
      font-size: 5rem;
    }

    & span.text {
      font-size: 1rem;
    }
  }

  .traffic-light {
    display: flex;
    flex-direction: column;
    background: gray;
    width: 7rem;
    border-radius: 2rem;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    & div {
      width: 4rem;
      aspect-ratio: 1;
      background: red;
      border-radius: 100%;
      box-shadow: 0px 0px 20px red;
      opacity: 1;

      &:last-of-type {
        background: lime;
        box-shadow: none;
        opacity: 0.2;
      }
    }

    &.go div {
      box-shadow: none;
      opacity: 0.2;

      &:last-of-type {
        box-shadow: 0px 0px 20px lime;
        opacity: 1;
      }
    }
  }

  .buttons button {
    padding-inline: 1rem;

    & code {
      padding: 0.2rem 0.5rem;
    }
  }
</style>
