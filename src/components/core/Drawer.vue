<template>
  <v-navigation-drawer v-model="inputValue" app>
    <v-list-item class="py-5">
      <v-list-item-avatar color="white">
        <v-img :src="logo" height="34" contain />
      </v-list-item-avatar>
      <v-list-item-title class="title">HANPASS</v-list-item-title>
    </v-list-item>
    <v-list shaped>
      <v-list-item-group v-model="select" color="primary">
        <div v-for="(item, i) in menus" :key="i">
          <div v-if="item.child !== undefined && item.child.length > 0">
            <v-list-group>
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item v-for="(child, j) in item.child" :key="j" :to="child.link" dense>
                <v-list-item-icon>
                  <v-icon>arrow_right</v-icon>
                </v-list-item-icon>
                <v-list-item-title v-text="child.text"></v-list-item-title>
              </v-list-item>
            </v-list-group>
          </div>
          <v-list-item v-else :to="item.link">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list-item-group>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block text large color="error" @click="logOut()">Logout</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import menu from '@/config/menu'

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    logo: 'favicon.ico'
  }),
  created() {
    this.setMenuItems(menu)
  },
  computed: {
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get() {
        return this.$store.state.app.drawer
      },
      set(val) {
        this.setDrawer(val)
      }
    },
    select: {
      get() {
        return this.$store.state.app.menuSeleted
      },
      set(val) {
        this.setMenuSelected(val)
      }
    },
    menus: {
      get() {
        return this.$store.state.app.menuItems
      }
    }
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer', 'setMenuItems', 'setMenuSelected']),
    logOut() {
      //self.location.href = '/logout'
    }
  }
}
</script>
