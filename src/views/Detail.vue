<script setup>
import httpService from '@/services/HttpService';
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute(); // 현재 URL 정보를 가져올 떄 사용한다.
console.log(route.fullPath);

const router = useRouter(); // JS 코드로 경로를 이동하고 싶을 때 사용한다.

const state = reactive({
  memo: {
    id: 0,
    title: '',
    content: '',
    createdAt: '',
  },
});

onMounted(async () => {
  const id = route.params.id; // 현재 주소(URL) 경로의 패스베리어블(:id) 값
  const data = await httpService.findById(id);
  state.memo = data.resultData;
});

const moveToForm = () => {
  const json = JSON.stringify(state.memo); // 객체를 문자열(JSON)로 변환
  router.push({
    path: '/memo/add',
    state: {
      data: json,
    },
  });
};
</script>

<template>
  <div class="mb-3">등록일시: {{ state.memo.createdAt }}</div>
  <div class="mb-3">제목: {{ state.memo.title }}</div>
  <div class="mb-3">내용: {{ state.memo.content }}</div>
  <button type="button" class="btn btn-primary w-100 py-3" @click="moveToForm">
    수정
  </button>
</template>

<style scoped></style>
