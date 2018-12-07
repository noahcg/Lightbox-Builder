<template>
  <div class="builder">
    <BasicForm />
  </div>
</template>

<script>
// @ is an alias to /src
import BasicForm from "@/components/BasicForm.vue";

export default {
  name: "builder",
  components: {
    BasicForm
  }
};
</script>
