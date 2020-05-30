<script>
export default {
   name: 'galaxy-tile',

   props: {
      sector: {
         type: Object,
         shape: () => ({
            coords: Object,
            system: Object,
            fleets: Array,
            isSystem: Boolean,
         }),
         required: true,
      },
   },
};
</script>

<template>
   <div :class="['tile', { selected: sector.selected }]" @click="$emit('click', sector)">
      <div class="fleets">
         <span v-for="fleet in sector.fleets" :key="fleet.id" class="fleet" />
      </div>
      <div class="primary-body">
         <span v-if="sector.isSystem" :class="['body', sector.system.primary_body]" />
      </div>

      <div class="foot"></div>
   </div>
</template>

<style lang="scss" scoped>
@keyframes pulsar {
   0% { transform: rotate(10deg); }
   50% { transform: rotate(-10deg) }
   100% { transform: rotate(10deg); }
}

.tile {
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
   border-radius: 5px;
   padding: 2px;
   &.selected { border: 1px solid green; }
   &:hover {
      border: 1px solid white;
      &.selected { border: 1px solid lime; }
   }

   .fleets {
      height: 5px;
      width: 100%;
      display: flex;
      .fleet {
         height: 5px;
         width: 5px;
         background: turquoise;
         border-radius: 50%;
      }
   }

   .primary-body {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .body {
         height: 12px;
         width: 12px;
         border-radius: 50%;
         &.main-sequence-a {
            background: white;
            box-shadow: 0px 0px 3px 3px white;
         }
         &.main-sequence-g {
            background: white;
            box-shadow: 0px 0px 3px 3px #faa500;
         }
         &.brown-dwarf {
            background: brown;
            box-shadow: 0px 0px 3px 3px purple;
         }
         &.black-hole {
            background: black;
            box-shadow: 0px 0px 3px 3px purple;
         }
         &.pulsar {
            height: 7px;
            width: 7px;
            background: white;
            box-shadow: 0px 0px 3px 3px blue;
            position: relative;
            animation: pulsar 15ms linear infinite;
            &::before {
               content: "";
               width: 15px;
               position: absolute;
               top: 2px;
               left: 100%;
               border: 1px solid blue;
            }
            &::after {
               content: "";
               width: 15px;
               position: absolute;
               top: 2px;
               right: 100%;
               border: 1px solid blue;
            }
         }
      }
   }

   .foot {
      height: 5px;
      width: 100%;
   }
}
</style>
