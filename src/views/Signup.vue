<template>
  <button @click="dosomething">Click</button>
</template>

<script>
export default {
  methods: {
    dosomething() {
      console.log("Hi");
    },
  },
};
</script>
