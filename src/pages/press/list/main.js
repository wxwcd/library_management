import { Press } from "@/service";
import columns from "./columns";
import base from '@/mixins/base'
export default {
    name: "Press",
    mixins: [base],
    components: {
        NewRow: () => import('../newRow/index.vue')
    },
    data() {
        return {
            loading: false,
            data: [],
            count: 0,
            params: {
                pageNo: 1, //当前页
                size: 20
            },
            rows: [],
            columns: columns.call(this),
            modal: {
                show: false,
                row:null,//编辑的对象
            }
        };
    },
    created() {
        this.showList();
    },
    methods: {
        async addrow() {
            this.modal.show = true;
        },
        async showList() {
            const { data } = await Press.get({
                ...this.params,
            });
            let { rows = [], count } = data;
            this.data = rows;
            this.count = count;
        },
        async confirmDel(ids) {
            let { data } = await Press.delete({
                ids: ids || this.rows.map(({ _id }) => _id)
            });
            this.$Message.success("删除成功！");
            this.showList();
        },

    }
};
