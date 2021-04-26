<template>
  <section id="mine__sweeper__container">
    <div v-if="isClear" class="clear__message">
      클리어시간 : {{ clear() }}초
    </div>

    <!-- 게임난이도 입력받기 -->
    <div class="level">
      <label for="horizontal">가로</label>
      <input type="number" name="horizontal" v-model="horizontal" min="1" max="25" />
      <label for="vertical">세로</label>
      <input type="number" name="vertical" v-model="vertical" min="1" max="25" />
      <label for="mineNumber">지뢰개수</label>
      <input type="number" name="mineNumber" v-model="mineNumber" min="10" />
      <button :disabled="isReady" class="start__btn" :class="{ active__btn: !isReady }" @click.prevent="start">시작</button>
    </div>

    <!-- 보드판영역 -->
    <div>
      <!-- 보드판 -->
      <ul class="board">
        <!-- 한줄 -->
        <li v-for="(line, index) in board" :key="index">
          <ul class="board__horizontal">
            <!-- 한칸 -->
            <li v-for="(piece, idx) in line" :key="idx" class="piece" @contextmenu.prevent @mousedown.right="rightClickPiece" @mousedown.left="leftClickPiece" :data-h-value="idx" :data-v-value="index" />
          </ul>
        </li>
      </ul>
    </div>

  </section>
</template>

<script>
export default {
  name: 'MineSweeper',
  data(){
    return{
      board: [],      // 보드판
      kinds: {},      // 종류
      state: "",      // 현재 게임상태
      startTime: 0,   // 게임클리어시간
      openCount: 0,   // 열린칸 개수 ( 종료조건 )
      horizontal: 10, // 가로길이
      vertical: 10,   // 세로길이
      mineNumber: 10, // 지뢰개수
    }
  },
  methods: {
    init(){
      this.board = [];
      this.openCount = 0;
      this.state = "awaiting";
      this.startTime = 0;
      document.querySelectorAll(".piece").forEach(v => {
        v.classList.remove("open");
        v.innerText = "";
      });
    },
    start(){
      this.init();

      const horizontal = Number(this.horizontal);        // horizontal값
      const vertical = Number(this.vertical);        // vertical값
      const mineNumber = Number(this.mineNumber);        // vertical값

      for(let idx = 0; idx < vertical; idx++){
        this.board.push(Array(horizontal).fill().map(() => 0));
      }

      // 랜덤위치 지뢰생성
      const array = Array(horizontal * vertical).fill().map((v, i) => i);
      const shuffle = [];

      //지뢰추가할 랜덤위치 선정
      for (let i = 0; i < mineNumber; i++) {
        const idx = Math.floor(Math.random() * array.length);
        shuffle[i] = array.slice(idx)[0];
        array.splice(idx, 1);
      }

      //지뢰추가 ==== 여기 수정필요
      for (let i = 0; i < shuffle.length; i++) {
        const h = Math.floor(shuffle[i] / horizontal);
        const v = shuffle[i] % horizontal;

        this.board[h][v] = this.kinds.MINE;
      }

      // 게임시작
      this.state = "playing"

      this.startTime = new Date;
    },
    leftClickPiece(e){
      // 게임진행중일경우에만 클릭가능
      if(this.state !== "playing"){
        return;
      }

      const pieceDataset = e.currentTarget.dataset; // 클릭한놈
      const h = Number(pieceDataset.hValue);        // horizontal값
      const v = Number(pieceDataset.vValue);        // vertical값

      // 지뢰로 지정했으면 오픈불가능
      if(e.currentTarget.innerText === "X"){
        return;
      }

      switch (this.board[v][h]) {
        case 0:
          // 클릭한칸 오픈
          e.currentTarget.classList.add("open");

          // 주위 지뢰개수
          const surroundMineNumber = this.surroundMineNumber(v, h);
          e.currentTarget.innerText = surroundMineNumber;
          
          // 주변칸 오픈... surroundMineNumber, surroundPieceOpen의 3번째 변수는 자기자신은 이미 처리했기때문에 예외적으로 처리해주기위해 사용...
          if(surroundMineNumber === 0){
            this.surroundPieceOpen(v, h, "exception");
            this.openCount--;
          }

          break;
        case 1:
          // 게임종료 및 답공개
          alert("지뢰 :: 게임종료");
          e.currentTarget.innerText = "펑";

          const picecList = document.querySelectorAll(".piece");
          picecList.forEach(value => {
            // 지뢰인칸은 지뢰로 표시하기
            const hh = Number(value.dataset.hValue);
            const vv = Number(value.dataset.vValue);
            if(this.board[vv][hh] === this.kinds.MINE){
              value.innerText = "펑";
            }

            // 모든칸 오픈하기
            value.classList.add("open");

            // 게임종료
            this.state = "over";
          });
          break;
      
        default:
          break;
      }
    },
    rightClickPiece(e){
      // 게임진행중일경우에만 클릭가능
      if(this.state !== "playing"){
        return;
      }

      switch (e.currentTarget.innerText) {
        case "":
          e.currentTarget.innerText = "X";
          break;
        case "X":
          e.currentTarget.innerText = "";
          break;
      
        default:
          break;
      }
    },
    surroundMineNumber(v, h, exception){
      // 이미 열린칸이면 취소
      if(this.board[v][h] === 2 && exception === undefined){
        return;
      }

      // 오픈한거 board에 적용
      this.board[v][h] = 2;

      // 열린칸 개수세기
      this.openCount++;

      const tempArray = [];
      // 주변 조각들 배열에 넣고 ( 자기자신제외 )
      for(let vv = -1; vv <= 1; vv++){
        for(let hh = -1; hh <= 1; hh++){
          // 세로 인덱스범위초과제외
          if(v + vv <= -1 || v + vv >= Number(this.vertical)){
            continue;
          }

          // 가로 인덱스범위초과제외
          if(h + hh <= -1 || h + hh >= Number(this.horizontal)){
            continue;
          }

          // 자기자신제외
          if(vv === 0 && hh === 0){
            continue;
          }
          tempArray.push(this.board[v + vv][h + hh]);
        }
      }
      // 지뢰인놈만 반환
      const count = tempArray.filter(v => v === this.kinds.MINE);

      // 지뢰개수리턴
      return count.length;
    },
    surroundPieceOpen(v, h, exception){
      if(this.board[v][h] === 2 && exception === undefined){
        return;
      }

      const target = document.querySelector(".board").children[v].children[0].children[h];

      target.classList.add("open");

      const surroundMineNumber= this.surroundMineNumber(v, h, 123);
      target.innerText = surroundMineNumber;

      // 0이면 다시호출 (재귀함수)
      if(surroundMineNumber === 0){
        for(let vv = -1; vv <= 1; vv++){
          for(let hh = -1; hh <= 1; hh++){
            // 세로 인덱스범위초과제외
            if(v + vv <= -1 || v + vv >= Number(this.vertical)){
              continue;
            }

            // 가로 인덱스범위초과제외
            if(h + hh <= -1 || h + hh >= Number(this.horizontal)){
              continue;
            }

            // 자기자신제외
            if(vv === 0 && hh === 0){
              continue;
            }

            this.surroundPieceOpen(v + vv, h + hh);
          }
        }
      }
    },
    clear(){
      const time = (new Date() - this.startTime) / 1000
      return time;
    }
  },
  computed: {
    isReady(){
      const horizontal = Number(this.horizontal);        // horizontal값
      const vertical = Number(this.vertical);        // vertical값
      const mineNumber = Number(this.mineNumber);        // vertical값

      if(horizontal < 1){
        return true;
      }
      if(vertical < 1){
        return true;
      }
      if(mineNumber < 10 || (mineNumber > horizontal * vertical)){
        return true;
      }

      return false;
    },
    isClear(){
      const horizontal = Number(this.horizontal);        // horizontal값
      const vertical = Number(this.vertical);        // vertical값
      const mineNumber = Number(this.mineNumber);        // vertical값

      return this.openCount === (horizontal * vertical - mineNumber);
    }
  },
  created(){
    this.state = "waiting";
    /**
     * 0, O : 아무것도없음
     * X, 1 : 마인
     * 2 : 오픈
     */
    this.kinds.FLAG = 0;
    this.kinds.MINE = 1;
  }
}
</script>

<style scoped>
#mine__sweeper__container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#mine__sweeper__container > div{
  margin-bottom: 2rem;
}

@keyframes clear_message{
  70%{
    font-size: 2.5rem;
  }
  to{
    font-size: 2rem;
  }
}

.clear__message{
  animation: clear_message 1s forwards ease-in-out;
  font-size: 0;
}

.board{
  display: flex;
  flex-direction: column;
}

.board__horizontal{
  display: flex;
}

.piece{
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid lightgray;
  text-align: center;
  line-height: 1.5;
  background: black;
  color: gray;
  font-size: 1.5em;
}

.start__btn{
  border: 0;
  background: lightgray;
  color: white;
  cursor: not-allowed;
}

.active__btn{
  background: blue;
  cursor: pointer;
}

.open{
  background: white;
  color: black;
}
</style>