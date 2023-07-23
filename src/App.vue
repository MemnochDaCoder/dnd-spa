<template>
  <div class="container">
    <!-- Tab Navigation -->
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" id="ex1-tab-1" data-bs-toggle="pill" href="#ex1-tabs-1" role="tab"
          aria-controls="ex1-tabs-1" aria-selected="true">Spells</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="ex1-tab-2" data-bs-toggle="pill" href="#ex1-tabs-2" role="tab"
          aria-controls="ex1-tabs-2" aria-selected="false">Classes</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="ex1-tab-3" data-bs-toggle="pill" href="#ex1-tabs-3" role="tab"
          aria-controls="ex1-tabs-3" aria-selected="false">Equipment</a>
      </li>
    </ul>
    <!-- Tab Content -->
    <div class="tab-content">
      <div class="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel" aria-labelledby="ex1-tab-1">
        <SpellContainer></SpellContainer>
      </div>
      <div class="tab-pane fade" id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">
        <ClassContainer></ClassContainer>
      </div>
      <div class="tab-pane fade" id="ex1-tabs-3" role="tabpanel" aria-labelledby="ex1-tab-3">
        <EquipmentContainer />
      </div>
    </div>
  </div>
</template>

<script>
import SpellContainer from './components/Spells/SpellContainer.vue';
import ClassContainer from './components/Classes/ClassContainer.vue';
import EquipmentContainer from './components/Equipment/EquipmentContainer.vue';

export default {
  name: 'App',
  components: {
    SpellContainer,
    ClassContainer,
    EquipmentContainer,
  },
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}
</style>
