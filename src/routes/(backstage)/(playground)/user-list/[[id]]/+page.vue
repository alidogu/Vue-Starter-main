<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { XBreadcrumb, XTooltip, XButton, XChip, XSelect, XDialog, XTextField } from '@x/ui';
import { request } from '@x/ui';

const router = useRouter();
const route = useRoute();

const dataCount = 121;

const users = ref<any>([]);

const flux = reactive({
  rowsPerPage: 10,
  rowsPerPageOptions: [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '50', value: 50 },
  ],

  currentPage: 1,
  currentPageOptions: [{ label: '1', value: 1 }],
  totalPage: 1,

  userDialog: false,
  addUser() {
    router.push('/user-list/new');
    flux.userForm = {};
  },
  userForm: {} as any,
  async viewUser(user: any) {
    const response = await request<any>(`/user-list/${user._id}`, { method: 'GET' });
    router.push(`/user-list/${response._data.result._id}`);
    flux.userForm = response._data.result;
  },
});

watch(
  () => flux.userDialog,
  (val) => {
    if (!val) {
      router.push('/user-list');
    }
  },
);

watch(
  () => route.params.id,
  (val) => {
    flux.userDialog = Boolean(val);
  },
  { immediate: true },
);

onMounted(async () => {
  const response = await request<any>('/user-list', { method: 'POST', body: {} });
  users.value = response._data.result;
});
</script>

<template>
  <XBreadcrumb :items="[{ text: 'Management' }, { text: 'User List' }]" />

  <div class="my-4">
    <div class="text-3xl font-bold">User List</div>
  </div>

  <div
    class="col-span-3 relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-800 w-full shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-base text-blueGray-700 dark:text-blueGray-300">Users</h3>
        </div>

        <div class="px-4">
          <XButton @click="flux.addUser">Add User</XButton>
        </div>
      </div>
    </div>

    <div class="w-full overflow-auto">
      <table class="items-center w-full bg-transparent border-collapse">
        <thead class="thead-light">
          <tr>
            <th
              class="px-6 bg-blueGray-50 dark:bg-blueGray-700 text-blueGray-500 dark:text-blueGray-200 align-middle border border-solid border-blueGray-100 dark:border-blueGray-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Username
            </th>
            <th
              class="px-6 bg-blueGray-50 dark:bg-blueGray-700 text-blueGray-500 dark:text-blueGray-200 align-middle border border-solid border-blueGray-100 dark:border-blueGray-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Full Name
            </th>
            <th
              class="px-6 bg-blueGray-50 dark:bg-blueGray-700 text-blueGray-500 dark:text-blueGray-200 align-middle border border-solid border-blueGray-100 dark:border-blueGray-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Email
            </th>
            <th
              class="px-6 bg-blueGray-50 dark:bg-blueGray-700 text-blueGray-500 dark:text-blueGray-200 align-middle border border-solid border-blueGray-100 dark:border-blueGray-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Status
            </th>
            <th
              class="px-6 bg-blueGray-50 dark:bg-blueGray-700 text-blueGray-500 dark:text-blueGray-200 align-middle border border-solid border-blueGray-100 dark:border-blueGray-600 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in users"
            :key="user._id"
            class="hover:bg-slate-100 dark:hover:bg-slate-600 border-b dark:border-slate-600"
          >
            <td class="px-6 py-3 align-middle whitespace-nowrap">
              {{ user.username }}
            </td>
            <td class="px-6 py-3 align-middle whitespace-nowrap">
              {{ user.fullName }}
            </td>
            <td class="px-6 py-3 align-middle whitespace-nowrap">
              {{ user.email }}
            </td>
            <td class="px-6 py-3 align-middle whitespace-nowrap">
              <XChip
                :color="
                  user.status
                    ? !user.otpEnabled || !user.otpVerified
                      ? 'warning'
                      : 'success'
                    : 'danger'
                "
                >{{
                  user.status
                    ? !user.otpEnabled || !user.otpVerified
                      ? 'Pending'
                      : 'Active'
                    : 'Suspended'
                }}</XChip
              >
            </td>
            <td class="flex gap-3 px-6 py-3 align-middle whitespace-nowrap">
              <XTooltip title="Edit">
                <XButton
                  variant="text"
                  color="success"
                  icon="i-fa-edit"
                  class="w-full"
                  @click="flux.viewUser(user)"
                />
              </XTooltip>

              <XTooltip title="Delete">
                <XButton
                  variant="text"
                  color="danger"
                  class="w-full"
                  icon="i-fa-trash"
                  @click="flux.viewUser(user)"
                />
              </XTooltip>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-end p-4 space-x-6">
      <div class="flex items-center">
        Rows per page:
        <div class="w-20 ml-2">
          <XSelect
            v-model:value="flux.rowsPerPage"
            :options="flux.rowsPerPageOptions"
            display="label"
          />
        </div>
      </div>

      <div class="flex items-center">
        {{ flux.currentPage * flux.rowsPerPage - flux.rowsPerPage + 1 }}-{{
          flux.currentPage * flux.rowsPerPage > dataCount
            ? dataCount
            : flux.currentPage * flux.rowsPerPage
        }}
        of
        {{ dataCount }}
      </div>

      <XButton variant="text" color="secondary">
        <div class="i-fa-angle-left w-4 h-4"></div>
        Previous
      </XButton>

      <XButton variant="text" color="secondary">
        Next
        <div class="i-fa-angle-right w-4 h-4"></div>
      </XButton>
    </div>
  </div>

  <XDialog v-model="flux.userDialog">
    <div class="grid">
      <div class="text-xl font-bold mb-4">Add User</div>

      <form class="space-y-5 mb-8">
        <XTextField v-model:value="flux.userForm.username" required>Username</XTextField>
        <XTextField v-model:value="flux.userForm.email" required>Email</XTextField>
        <XTextField v-model:value="flux.userForm.fullName" required>Full Name</XTextField>
      </form>

      <div class="flex justify-end gap-4">
        <XButton variant="outlined" color="secondary" @click="flux.userDialog = false">
          Cancel
        </XButton>
        <XButton>Add</XButton>
      </div>
    </div>
  </XDialog>
</template>
