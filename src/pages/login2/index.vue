<template>
  <div class="login">
      login
      <Checkbox :checked.sync="single">Checkbox</Checkbox>
      <Tabs value="name1">
        <TabPane label="标签一" name="name1">标签一的内容xxx</TabPane>
        <TabPane label="标签二" name="name2">标签二的内容111</TabPane>
        <TabPane label="标签三" name="name3">标签三的内容</TabPane>
    </Tabs>
    <img src="./../../assets/images/1.jpg" />
    <div id="log"></div>
    <div id='tree' class="ztree"></div>

  </div>
</template>

<script>
import Checkbox from 'iview/src/components/checkbox';
import TabPane from 'iview/src/components/tab-pane';
import Tabs from 'iview/src/components/tabs';
import Message from 'iview/src/components/message'
import test from '../../utils/test';
import Api from '@/api/index'
import Image from './../../assets/images/1.jpg'
export default {
    name: 'login2',
    components: {Checkbox: Checkbox, TabPane: TabPane, Tabs: Tabs, Message: Message},
    data () {
        return {
            single: false,
            src: Image
        }
    },
    async mounted () {
        test(1);
        const {code, data} = await Api.user.list();
        console.log('axios', code, data);
        const res = await this.getUser();
        console.log(res)
        this.buildTree();
    },
    methods: {
        getUser() {
            return new Promise((s,j) => {
                setTimeout(() => {
                    s('hahha')
                }, 3000)
            })
        },
        buildTree() {
            var setting = {
                data: {
                    key: {
                        title:"t"
                    },
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    beforeClick: beforeClick,
                    onClick: onClick
                }
            };

            var zNodes =[
                { id:1, pId:0, name:"普通的父节点", t:"我很普通，随便点我吧", open:true},
                { id:11, pId:1, name:"叶子节点 - 1", t:"我很普通，随便点我吧"},
                { id:12, pId:1, name:"叶子节点 - 2", t:"我很普通，随便点我吧"},
                { id:13, pId:1, name:"叶子节点 - 3", t:"我很普通，随便点我吧"},
                { id:2, pId:0, name:"NB的父节点", t:"点我可以，但是不能点我的子节点，有本事点一个你试试看？", open:true},
                { id:21, pId:2, name:"叶子节点2 - 1", t:"你哪个单位的？敢随便点我？小心点儿..", click:false},
                { id:22, pId:2, name:"叶子节点2 - 2", t:"我有老爸罩着呢，点击我的小心点儿..", click:false},
                { id:23, pId:2, name:"叶子节点2 - 3", t:"好歹我也是个领导，别普通群众就来点击我..", click:false},
                { id:3, pId:0, name:"郁闷的父节点", t:"别点我，我好害怕...我的子节点随便点吧...", open:true, click:false },
                { id:31, pId:3, name:"叶子节点3 - 1", t:"唉，随便点我吧"},
                { id:32, pId:3, name:"叶子节点3 - 2", t:"唉，随便点我吧"},
                { id:33, pId:3, name:"叶子节点3 - 3", t:"唉，随便点我吧"}
            ];
            var log, className = "dark";
            function beforeClick(treeId, treeNode, clickFlag) {
                className = (className === "dark" ? "":"dark");
                showLog("[ "+getTime()+" beforeClick ]&nbsp;&nbsp;" + treeNode.name );
                return (treeNode.click != false);
            }
            function onClick(event, treeId, treeNode, clickFlag) {
                showLog("[ "+getTime()+" onClick ]&nbsp;&nbsp;clickFlag = " + clickFlag + " (" + (clickFlag===1 ? "普通选中": (clickFlag===0 ? "<b>取消选中</b>" : "<b>追加选中</b>")) + ")");
            }		
            function showLog(str) {
                if (!log) log = $("#log");
                log.append("<li class='"+className+"'>"+str+"</li>");
                if(log.children("li").length > 8) {
                    log.get(0).removeChild(log.children("li")[0]);
                }
            }
            function getTime() {
                var now= new Date(),
                h=now.getHours(),
                m=now.getMinutes(),
                s=now.getSeconds();
                return (h+":"+m+":"+s);
            }

            $.fn.zTree.init($("#tree"), setting, zNodes);
        }
    }
}
</script>

<style scoped lang="less">
    .login {
        color: red;
    }
    #log {
        background-image: url(./../../assets/images/1.jpg);
    }
</style>