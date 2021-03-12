// https://mp.weixin.qq.com/s/oXc31L5PJSplOdYhC7d0jA
new Blob(blobParts, options);

// lobParts:数组类型,可以存放任意多个_ArrayBuffer_, ArrayBufferView, 
//          Blob_或者_DOMString（会编码为UTF-8）,将它们连接起来构成Blob对象的数据.
// options:可选项,用于设置blob对象的属性,可以指定如下两个属性：
// type：存放到blob中数组内容的_MIME_类型（默认为""）.
// endings:用于指定包含行结束符\n的字符串如何被写入.
//         值为_native_表示行结束符会被更改为适合宿主操作系统文件系统的换行符（默认值为_transparent_表示会保持blob中保存的结束符不变）

{
    // 创建一个包含domstring对象的blob对象
    const blob = new Blob(['<div>john</div>'], {
        type: 'text/xml'
    });
    console.log(blob); // Blob {size: 15, type: "text/xml"}
} {
    // 创建一个包含arraybuffer对象的blob对象
    var abf = new ArrayBuffer(8);
    const blob = new Blob([abf], {
        type: 'text/plain'
    });
    console.log(blob); // Blob {size: 8, type: "text/plain"}
} {
    // 创建一个包含arraybufferview对象的blob对象
    var abf = new ArrayBuffer(8);
    var abv = new Int16Array(abf);
    const blob = new Blob(abv, {
        type: 'text/plain'
    });
    console.log(blob); // Blob {size: 4, type: "text/plain"}
}


// slice(start:number, end:number, contentType:DOMString)：类似于数组的_slice_方法,将原始Blob对象按照指定范围分割成新的blob对象并返回,可以用作切片上传
//         start：开始索引,默认为0
//         end：结束索引,默认为最后一个索引
//         contentType：新Blob的MIME类型,默认情况下为空字符串
// stream()：返回一个能读取blob内容的_ReadableStream_.
// text()：返回一个_Promise_对象且包含blob所有内容的UTF-8格式的 USVString.
// arrayBuffer()：返回一个_Promise_ 对象且包含blob所有内容的二进制格式的_ArrayBuffer_.

{
    input获取本地文件
    /** 
        <
        input type = "file"
        multiple id = "f" / >
        <script >
            var elem = document.getElementById('f');
        elem.onchange = function (event) {
            var files = event.target.files;
            console.log(files); // [{{name: "1.jpg",lastModified: 1594369580771...},{name:'2.jpg',lastModified: 1596012406708...}]
            var file = files[0];
            console.log(file); // {name: "1.jpg",lastModified: 1594369580771,size: 22344,type: "image/jpeg"...}
            console.log(file instanceof File); //true
            console.log(files instanceof FileList); // true

            // File继承Blob 
            console.log(file.__proto__.__proto__); // Blob {size: 22344, type: ""}
        }; 
        </script>
    */
} {
    拖放获取
    /**
        <div id="content" ondrop="drop(event)" ondragover="allowDrop(event);" />
        <script>
        function allowDrop(ev) {
        ev.preventDefault();
        }
        function drop(ev) {
        ev.preventDefault();
        const files = ev.dataTransfer.files;
        console.log(files); // [{{name: "1.jpg",lastModified: 1594369580771...},{name:'2.jpg',lastModified: 1596012406708...}]
        console.log(files instanceof FileList); // true
        }
        </script>
        <style type="text/css">
        #content {
        width: 500px;
        height: 500px;
        border: 1px solid brown;
        }
        </style>
     */

}
// File 对象没有自己的实例方法,由于继承了 Blob 对象,因此可以使用 Blob 的实例方法slice().


{
    数据缓冲区 {
        Buffer
        // Buffer是Node.js提供的对象,前端没有
    } {
        ArrayBuffer
        ArrayBuffer(length);
        // 读取
        FileReader
        // 写入
        TypeArray
        // 类型化数组(TypedArrays)是JavaScript中新出现的一个概念,专为访问原始的二进制数据而生,本质上,类型化数组和ArrayBuffer是一样的,只不过是他具备读写功能
        DataView
        // DataView对象可以在ArrayBuffer中的任意位置读取和存储不同类型的二进制数据.    
        ArrayBufferView

    }


} {
    BlobURL

    /** 
     * 图像展示
    <div id="content">
        <input type="file" multiple id="f" />
    </div>
    <script>
        const elem = document.getElementById('f');
        const content = document.getElementById('content');
        
        // 根据不同浏览器封装一个转换BlobUrl的方法:file可以是File对象也可以是Blob对象
        const getObjectURL = (file) => {
        let url;
        if (window.createObjectURL) {
            url = window.createObjectURL(file);
        } else if (window.URL) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL) {
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
        };

        elem.onchange = function (event) {
        const files = event.target.files;
        const file = files[0];
        const img = document.createElement('img');
        img.src = getObjectURL(file);
        content.appendChild(img);
        };
    </script>
    */
    /**
    * 
    * 文件下载
    * <button onclick="download()">download.txt</button>

    <script>
      const getObjectURL = (file) => {
        let url;
        if (window.createObjectURL) {
          url = window.createObjectURL(file);
        } else if (window.URL) {
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL) {
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      };
      function download() {
        const fileName = 'download.txt';
        const myBlob = new Blob(['johnYu'], { type: 'text/plain' });
        downloadFun(fileName, myBlob);
      }
      function downloadFun(fileName, blob) {
        const link = document.createElement('a');
        link.href = getObjectURL(blob);
        link.download = fileName;
        link.click();
        link.remove();
        URL.revokeObjectURL(link.href);
      }
    </script>
    */
}
{
    dataURL
    // dataURL允许内容的创建者将较小的文件嵌入到文档中.与常规的URL使用场合类似


//     data:前缀
//     mediatype表明数据类型,是一个_MIME_类型字符串,如image/jpeg表示一个JPEG图片文件.如果省略,默认值为_text/plain;charset=US-ASCII_.
//     base64:标志位（如果是文本,则可选）
//     data:数据本身

    FileReader 
        readAsDataURL()
    原生的btoa方法编码
        编码
            btoa()
        解码
            atob()
    canvas的toDataURL
        /** 
            <canvas id="canvas" width="200" height="50"></canvas>
            <textarea id="content" style="width: 200px; height: 200px"></textarea>

            <script>
            var canvas = document.getElementById('canvas');
            if (canvas.getContext) {
                var ctx = canvas.getContext('2d');
                // canvas的绘制
                ctx.font = 'Bold 20px Arial';
                ctx.textAlign = 'left';
                ctx.fillStyle = 'purple';
                ctx.fillText('johnYu', 10, 30);
                // 获取 Data URL
                document.getElementById('content').value = canvas.toDataURL();
            }
            </script>
        */
    DataUrl的使用
        由于可以将其用作URL的替代,因此DataURL和BlobUrl一样可以在script/img/video/iframe等标签的src属性和background的url中使用,用法与BlobUrl基本一致,只需要将前面的+'elem.onchange'+做如下改造
            /**
            <body>
            <div id="content">
            <input type="file" multiple id="f" />
            </div>
            <script>
            const elem = document.getElementById('f');
            const content = document.getElementById('content');
        
            elem.onchange = function (event) {
                const files = event.target.files;
                const file = files[0];
                const img = document.createElement('img');
        -        img.src = getObjectURL(file);
        +        const reader = new FileReader();
        +        reader.onload = function () {
        +          img.src = reader.result;
        +        };
        +        reader.readAsDataURL(file);
                content.appendChild(img);
            };
            </script>
        </body>
         */
        由于数据本身由URL表示,因此可以将其保存在Cookie中传递给服务器
        当图片的体积太小,占用一个HTTP会话不是很值得时
        当访问外部资源很麻烦或受限时
        DataUrl不会被浏览器缓存,但是小部分会通过css缓存,在下面例子中,DataUrl的使用是完全符合场景的.它避免了让这个小小的背景图片独自产生一次HTTP请求,而且,这个小图片还能同CSS文件一起被浏览器缓存起来,重复使用,不会每次使用时都加载一次.只要这个图片不是很大,而且不是在CSS文件里反复使用,就可以DataUrl方法呈现图片降低页面的加载时间,改善用户的浏览体验
        作为下载连接使用
        /**
            <script>
            const createDownload = (fileName, content) => {
            const blob = new Blob([content]);
            const reader = new FileReader();
            const link = document.createElement('a');
            link.innerHTML = fileName;
            link.download = fileName;
            reader.onload = () => {
                link.href = reader.result;
                document.getElementsByTagName('body')[0].appendChild(link);
            };
            reader.readAsDataURL(blob);
            };
        
            createDownload('download.txt', 'johnYu');
        </script>
        */
  

}
{
    BolbURL
    DataURL
        区别
        BlobUrl始终是唯一字符串,即时你每次传递相同的Blob,每次也会生成不同的BlobUrl;DataUrl值跟随blob变化
        就BlobUrl而言,它并不代表数据本身,数据存储在浏览器中,BlobUrl只是访问它的key.数据会一直有效,直到关闭浏览器或者手动清除.而DataUrl是直接编码的数据本身.因此即使将BlobUrl传递给服务器等也无法访问数据.关闭浏览器后仍然可以在地址栏访问后DataUrl,但是访问不到BlobUrl
        BlobUrl的长度一般比较短,但DataUrl因为直接存储图片base64编码后的数据,往往很长\(Base64编码的数据体积通常会比二进制格式的图片体积大1/3.\)+ 因此当显式大图片时,使用BlobUrl能获取更好的可能性,速度和内存比DataUrl更有效
        BlobUrl可以方便的使用XMLHttpRequest获取源数据(xhr.responseType = 'blob').对于DataUrl,并不是所有浏览器都支持通过XMLHttpRequest获取源数据的
        BlobUrl除了可以用作图片资源的网络地址，BlobUrl也可以用作其他资源的网络地址，例如html文件、json文件等，为了保证浏览器能正确的解析BlobUrl返回的文件类型，需要在创建Blob对象时指定相应的type

}

