import { createRouter, createWebHistory } from 'vue-router'
import SkillMatrix from '../views/SkillMatrix.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: SkillMatrix
  },
  {
    path: '/skills',
    name: 'skills.listskill',
    component: () => import('../views/skills/ListSkill.vue')
  },
  {
    path: '/skills/create',
    name: 'skills.create',
    component: () => import('../views/skills/FormSkill.vue')
  },
  {
    path: '/skills/edit/:id',
    name: 'skills.edit',
    component: () => import('../views/skills/FormSkill.vue')
  },
  {
    path: '/levels',
    name: 'levels.listlevel',
    component: () => import('../views/levels/ListLevel.vue')
  },
  {
    path: '/levels/create',
    name: 'levels.create',
    component: () => import('../views/levels/FormLevel.vue')
  },
  {
    path: '/levels/edit/:id',
    name: 'levels.edit',
    component: () => import('../views/levels/FormLevel.vue')
  },
  {
    path: '/users',
    name: 'users.userSkill',
    component: () => import('../views/users/UserSkill.vue')
  },
  {
    path: '/users/create',
    name: 'users.create',
    component: () => import('../views/users/FormSkill.vue')
  },
  {
    path: '/users/edit/:id',
    name: 'users.edit',
    component: () => import('../views/users/FormSkill.vue')
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
