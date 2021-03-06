export default [{
    name: '类别管理',
    icon: 'android-share-alt',
    routerName: "Category"
}, {
    name: '机构管理',
    icon: 'share',
    routerName: "Press"
}, {
    name: '读者管理',
    icon: 'android-contact',
    routerName: "User"
}, {
    name: '图书管理',
    icon: 'android-map',
    routerName: "Book"
}, {
    name: '图书借还',
    icon: 'android-exit',
    routerName: "Borrow"
}, {
    name: '借阅统计',
    icon: 'ios-book-outline',
    routerName: "Ranking"
}].concat([{
    name: '借阅记录',
    hide: true,
    routerName: "Record"
}])
