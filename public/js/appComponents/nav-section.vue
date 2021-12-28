<template>
    <div 
    class="nav-section"
     @click="$root.$refs.products.filterNavigation(nav.type); 
    $emit('changeFocus', nav)" 
     :class="{'focus-nav':nav.focus}">{{nav.text}}
     </div>
</template>

<script>

export default {
    name: 'nav-section',
    props: ['nav']
    
}

</script>