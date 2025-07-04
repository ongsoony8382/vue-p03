<script setup>
import httpService from '@/services/HttpService';
import { reactive, onMounted } from 'vue';

const state = reactive({ //백엔드의 MemoGetRes 쪽  
  memos: [],
});

onMounted(() => {
  console.log('Home.vue - onMounted 보낸 콜백 함수 호출!');
  findAll({});
});

const findAll = async (params) => {
  console.log('params:', params);
  const data = await httpService.findAll(params);
  state.memos = data.resultData;
};

const remove = async (id) => {
  if (!confirm('삭제하시겠습니까?')) {
    return;
  }

  const data = await httpService.deleteById(id);
  if (data.resultData === 1) {
  }
};
</script>

<template>
  <div class="memo-list">
    <router-link to="/memo/add" class="add btn"> + 추가하기 </router-link>

    <router-link
      v-for="m in state.memos"
      :to="`/memos/${m.id}`"
      :key="m.id"
      class="item"
    >
      <div class="d-flex pt-3">
        <div class="pb-3 mb-0 w-100">
          <div class="d-flex justify-content-between">
            <b>{{ m.title }}</b>
            <div>
              <span role="button" @click.prevent="remove(m.id)">삭제</span>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.memo-list {
  background-color: rgb(230, 155, 196);
  .item {
    background-color: rgb(43, 182, 113);
    border: 1px solid #eee;
    display: block;
    color: white;
    text-decoration: none;
    padding: 20px 30px;
    margin: 15px 15px;

    &:hover {
      border-color: #aaa;
    }
  }
}

.add {
  display: block;
  background-color: yellow;
  border: 1px solid #eee;
  padding: 25px;
}
</style>
