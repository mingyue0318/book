// 列表是一组有序的数据。每个列表中的数据项称为元素
/*
listSize(属性)   列表的元素个数
pos(属性)        列表的当前位置
length(属性)     返回列表中元素的个数
clear(方法)      清空列表中的所有元素
toString(方法)   返回列表的字符串形式
getElement(方法) 返回当前位置的元素
insert(方法)     在现有元素后插入新元素
append(方法)     在列表的末尾添加新元素
remove(方法)     从列表中删除元素
front(方法)      将列表的当前位置设移动到第一个元素
end(方法)        将列表的当前位置移动到最后一个元素
prev(方法)       将当前位置后移一位
next(方法)       将当前位置前移一位
currPos(方法)    返回列表的当前位置
moveTo(方法)     将当前位置移动到指定位置

*/
{
    function List() {
        this.listSize = 0;
        this.pos = 0;
        this.dataStore = []; // 初始化一个空数组来保存列表元素 this.clear = clear;
        this.find = find;
        this.toString = toString;
        this.insert = insert;
        this.append = append;
        this.remove = remove;
        this.front = front;
        this.end = end;
        this.prev = prev;
        this.next = next;
        this.length = length;
        this.currPos = currPos;
        this.moveTo = moveTo;
        this.getElement = getElement;
        this.length = length;
        this.contains = contains;
    }

    function append(element) {
        this.dataStore[this.listSize++] = element
    }

    function find(element) {
        for (let i = 0; i < this.dataStore.length; i++) {
            if (this.dataStore[i] === element) {
                return i;
            }

        }
        return -1
    }

    function remove(element) {
        let foundAt = this.find(element);
        if (foundAt > -1) {
            this.dataStore.splice(foundAt, 1);
            --this.listSize;
            return true;
        }
        return false
    }

    function length() {
        return this.listSize
    }

    function toString() {
        return this.dataStore
    }

    function insert(element, after) {
        let insertPos = this.find(after);
        if (insertPos > -1) {
            this.dataStore.splice(insertPos + 1, 0, element);
            ++this.listSize
            return true
        }
        return false
    }

    function clear() {
        delete this.dataStore;
        this.dataStore = []
        this.listSize = this.pos = 0
    }

    function contains(element) {
        for (let i = 0; i < this.dataStore.length; i++) {
            if (this.dataStore[i] === element) {
                return true
            }
        }
        return false
    }

    function front() {
        this.pos = 0
    }

    function end() {
        this.pos = this.listSize - 1;
    }

    function prev() {
        if (this.pos > 0) {
            --this.pos;
        }
    }

    function next() {
        if (this.pos < this.listSize - 1) {
            ++this.pos
        }
    }

    function currPos() {
        return this.pos
    }

    function moveTo(position) {
        this.pos = position
    }

    function getElement() {
        return this.dataStore[this.pos]
    }

    function insertBig(element) {
        for (let i = 0; i < this.dataStore.length; i++) {
            if (this.dataStore[i] > element) {

            }
        }
    }
    // var names = new List();
    // names.append("Clayton");
    // names.append("Raymond");
    // names.append("Cynthia");
    // names.append("Jennifer");
    // names.append("Bryan");
    // names.append("Danny");
    // console.log(names.listSize)
    // console.log(names.front())
    // console.log(names.currPos())


    // for(names.front();names.currPos() < names.length();names.next()){
    //     console.log(names.getElement());
    // }
    // console.log(names.length())
    List.prototype.insertThen = function (element) {
        let condition
        if(typeof element === 'number'){
            condition = this.dataStore.every(ele => {
                return element > ele
            })
        }
        if(typeof element === 'string'){
            condition = this.dataStore.every(ele => {
                return String(element).charCodeAt() > ele.charCodeAt()
            })
        }

        if(condition){
            this.dataStore.append(element)
            return true
        }
        return false
        
    };

    let DataThen = new List();
    DataThen.append(`Mazey`);
    DataThen.append(`Cherrie`);
    DataThen.append(`Luna`);
    DataThen.append(`John`);
    DataThen.append(`July`);
    DataThen.append(23);
    DataThen.append(73);
    console.log(DataThen.toString()); // ["Mazey", "Cherrie", "Luna", "John", "July", 23, 73]Î
    DataThen.insertThen(90);
    console.log(DataThen.toString());
} { // 迭代器 列表


}