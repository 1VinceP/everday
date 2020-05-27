<script>
import { mapMutations, mapState } from 'vuex';
import ky from 'ky';

export default {
   name: 'game',

   data() {
      return {
         editing: false,
         name: this.game.name,
         description: this.game.description,
      };
   },

   computed: {
      ...mapState(['user']),
   },

   methods: {
      ...mapMutations(['setStore']),

      async onSaveEdit() {
         const games = await ky.put(`/games/${this.game.id}`, {
            headers: { 'user-id': this.user.id },
            json: { name: this.name, description: this.description },
         }).json();
         this.setStore({ games });
         this.editing = false;
      },

      onCancelEdit() {
         this.editing = false;
         this.name = this.game.name;
         this.description = this.game.description;
      },

      async onDelete() {
         // TODO: Remove confirm
         // eslint-disable-next-line no-alert
         const confirmed = window.confirm('Are you sure? This game will be gone forever.');
         if (confirmed) {
            const games = await ky.delete(`/games/${this.game.id}`, {
               headers: { 'user-id': this.user.id },
            }).json();
            this.setStore({ games });
         }
      },
   },

   props: {
      game: { type: Object, required: true },
   },
};
</script>

<template>
   <div class="game">
      <div v-if="!editing" class="head">{{ game.name }}</div>
      <input v-else v-model="name" />
      <div v-if="!editing" class="body">
         {{ game.description }}
      </div>
      <textarea v-else v-model="description" />
      <div class="foot">
         <button v-show="!editing" class="play">Play</button>
         <button v-if="!editing" class="edit" @click="editing = true">Edit</button>
         <button v-else @click="onSaveEdit" class="edit">Save</button>
         <button v-show="editing" @click="onCancelEdit" class="delete">Cancel</button>
         <button v-show="!editing" class="delete" @click="onDelete(game.id)">Delete</button>
      </div>
   </div>
</template>

<style lang="scss" scoped>
@import '../../variables.scss';

.game {
   height: 200px;
   width: 100%;
   background: $light-dark;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
   border-radius: 3px;
   padding: 10px 20px;
   &:not(:last-child) {
      margin-bottom: 10px;
   }

   .head {
      width: 100%;
      display: flex;
   }

   .body {
      height: 100%;
      width: 100%;
      display: flex;
      padding: 10px 0px;
      font-size: 13px;
   }

   .foot {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
         border: none;
         background: none;
         cursor: pointer;
         &.play { color: lime }
         &.edit { color: aquamarine }
         &.delete { color: red; }
      }
   }
}
</style>
