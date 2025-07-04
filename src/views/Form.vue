<script setup>
import HttpService from '@/services/HttpService';
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const state = reactive({
  // 메모 하나를 받아오기 위함. 백엔드의 MemoGetOneRes 쪽
  memo: {
    id: 0,
    title: '',
    content: '',
    createdAt: '',
  },
});

onMounted(() => {
  const passData = history.state.data; // "{"id":1,"title":"메모 제목",...}"
  if (passData) {
    //전달받은 데이터가 있다면
    const memo = JSON.parse(passData); //JSON을 객체로 전환
    state.memo = memo;
  }
});

const procSubmit = async () => {
  const jsonBody = {
    title: state.memo.title,
    content: state.memo.content,
  };

  let data = null;
  let path = '/';

  if (state.memo.id) {
    // 수정
    path = `/memos/${state.memo.id}`;
    jsonBody.id = state.memo.id; // 이걸 추가해줘서 어떤 번호의 메모가 수정될지 백엔드에게 알려줌.
    data = await HttpService.modify(jsonBody);
  } else {
    // 등록
    data = await HttpService.save(jsonBody);
  }

  if (data.resultData === 1) {
    router.push({ path });
  } else {
    alert(data.resultMessage);
  }
};
</script>

<template>
  <form class="detail" @submit.prevent="procSubmit">
    <div class="mb-3" v-if="state.memo.createdAt">
      등록일시: {{ state.memo.createdAt }}
    </div>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input
        type="text"
        id="title"
        class="form-control p-3"
        v-model="state.memo.title"
      />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea
        id="content"
        class="form-control p-3"
        v-model="state.memo.content"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary w-100 py-3">
      {{ state.memo.id > 0 ? '수정' : '저장' }}
    </button>
  </form>
</template>

<style scoped></style>
