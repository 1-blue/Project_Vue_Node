<template>
  <section id="chatting__container">
    <h1>Chatting</h1>

    <input type="text" v-model="currentChatting" />
    <span @click="sendMessage">버튼</span>

    <ul class="chatting__list">
      <li v-for="(data, index) in chattingData" :key="index">{{ data }}</li>
    </ul>
  </section>
</template>

<script>

export default {
  name: 'Chatting',
  data(){
    return{
      currentChatting: "",
      chattingData: [],
      clientId: "",
    }
  },
  methods: {
    // sendMessage(){
    //   this.$socket.emit('sendChatting', {
    //     chatting: this.currentChatting
    //   });
    //   this.currentChatting = "";
    // }
  },

  created(){
    // this.$socket.on('sendClientId', (data) => {
    //   this.clientId = data;
    // });
    // this.$socket.on('getChatting', (data) => {
    //   this.chattingData.push(data);
    // });
  }
}
</script>

<style>

</style>
