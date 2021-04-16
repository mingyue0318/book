// 事件传播的三个阶段是什么?

// Capturing > Target > Bubbling

// (捕获 目标 冒泡) 

// 第一阶段：从window对象传导到目标节点，称为“捕获阶段”（capture phase）。
// 第二阶段：在目标节点上触发，称为“目标阶段”（target phase）。
// 第三阶段：从目标节点传导回window对象，称为“冒泡阶段”（bubbling phase）
