<script>
  import { onMount } from 'svelte';
  import { listenToContractEvent, unsubscribe } from '../lib/solana.js';

  let events = [];
  let subscriptionId;

  onMount(async () => {
    const contractAddress = '5XvhfmRjwXkGp3jHGmaKpqeerNYjkuZZBYLVQYdeVcRv';

    subscriptionId = await listenToContractEvent(contractAddress, (event) => {
        events = [...events, event];
    });

    console.log("Subscription success!");

    return () => {
      unsubscribe(subscriptionId).then(() => {
        console.log('Unsubscribed from contract events');
      }).catch((error) => {
        console.error('Error unsubscribing:', error);
      });
  }});
</script>

<style>
    header {
      background-color: #0077cc; /* Change as per your color preference */
      color: #ffffff;
      padding: 20px;
      font-size: 24px;
      text-align: center;
    }
    .events-container {
      margin: 20px;
      padding: 10px;
      border: 1px solid #cccccc;
      border-radius: 5px;
    }
    .event {
      background-color: #f0f0f0;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 4px;
    }
  </style>
  

  <main>
    <header>Solana Event Listener</header>
    {#if events.length > 0}
      <div class="events-container">
        {#each events as event}
          <div class="event">{JSON.stringify(event)}</div>
        {/each}
      </div>
    {:else}
      <div class="events-container">No events detected yet.</div>
    {/if}
  </main>