
import Vue from 'vue'
import VueRouter from 'vue-router';

import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Login from '@/pages/login.vue'
import Register from '@/pages/Register.vue'

import FlatList from '@/pages/FlatList.vue'
import Renters from '@/pages/Renters.vue'
import Maps from '@/pages/Map.vue'
import UserEdit from '@/pages/UserEdit.vue'


Vue.use(VueRouter)

/* Importing Inner Pages */

/* Configur Vue Routes */
let router = new VueRouter({
    mode: 'history',
    routes: [        
        {
            path: "/login",
            name: "Login",
            component: Login,
            meta: { 
                guest: true
            }
        },
        {
            path: "/register",
            name: "Register",
            component: Register,
            meta: { 
                guest: true
            }
        },
        {
          path:"/",
          component:DashboardLayout,
          redirect:'dashboard',
          children: [
            {
                path: "dashboard",
                name: "Dashboard",
                component: Dashboard,
                meta:{
                    requiresAuth:true
                }
            },
            {
                path: "flatList",
                name: "Flat List",
                component: FlatList,
                meta:{
                    requiresAuth:true
                }
            },
            {
                path: "renters",
                name: "Renters",
                component: Renters,
                meta:{
                    requiresAuth:true
                }
            },
            {
                path: "map",
                name: "Maps",
                component: Maps,
                meta:{
                    requiresAuth:true
                }
            },
            {
                path: "userEdit/:userId",
                name: "User Edit",
                component: UserEdit
            }
          ]
        }
    ]    
  });

  router.beforeEach((to, from, next) => {
  
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if(window.$cookies.get('user_session') == null){
        /* If User Not Logged In */
        next({ name: 'Login'})
      } else {
        /* If User Logged In */
        next()
      }
    }else if(to.matched.some(record => record.meta.guest)) {
        if(window.$cookies.get('user_session') == null){
            next()
        }
        else{
            next({ name: 'Dashboard'})
        }
    }else {
        next() 
    }
  });

export default router;

/*const routes = [    
    {
        path: "/",
        component:DashboardLayout,
        redirect:'dashboard',
        children: [
            {
                path: "dashboard",
                name: "Dashboard",
                component: Dashboard,
                meta:{
                    requiresAuth:true
                }
            },
            {
                path: "userList",
                name: "User List",
                component: UserList
            },
            {
                path: "ourPlans",
                name: "Our Plans",
                component: OurPlans
            },
            {
                path: "map",
                name: "Maps",
                component: Maps
            },
            {
                path: "userEdit/:userId",
                name: "User Edit",
                component: UserEdit
            }
        ]
    },
    
];*/


  
  

/*
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('jwt') == null) {
        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        })
      } else {
        let user = JSON.parse(localStorage.getItem('user'))
        if(to.matched.some(record => record.meta.is_admin)) {
          if(user.is_admin == 1){
              next()
          }
          else{
              next({ name: 'userboard'})
          }
        }
        else {
            next()
        }
      }
    } else if(to.matched.some(record => record.meta.guest)) {
          if(localStorage.getItem('jwt') == null){
              next()
          }
          else{
              next({ name: 'userboard'})
          }
      }else {
      next() 
    }
  })
*/