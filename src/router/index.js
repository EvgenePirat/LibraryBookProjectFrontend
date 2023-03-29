import { createWebHistory, createRouter } from "vue-router";
import ManePage from '../page/ManePage.vue'
import MainLayout from '../layout/MainLayout.vue'
import ProductPage from '../page/ProductPage.vue'
import AddNewBook from '../page/AddNewBook.vue'
import AuthPageInSite from '../page/AuthPageinSite.vue'
import LibraryUser from '../page/LibraryUserPage.vue'
import CatalogPage from '../page/CatalogPage.vue'

const routes = [
  {
    path: "/",
    name: "MainLayout",
    component: MainLayout,
    children:[
      {
        path: "",
        name: "ManePage",
        component: ManePage,
      },
      {
        path: "/about/:id",
        name: "ProductPage",
        component: ProductPage,
      },
      {
        path: "/add",
        name: "AddNewBook",
        component: AddNewBook,
      },
      {
        path: "/enter_system",
        name: "AuthPageInSite",
        component: AuthPageInSite,
      },
      {
        path: "/my_library",
        name: "LibraryUser",
        component: LibraryUser,
      },
      {
        path: "/catalog",
        name: "CatalogPage",
        component: CatalogPage,
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;