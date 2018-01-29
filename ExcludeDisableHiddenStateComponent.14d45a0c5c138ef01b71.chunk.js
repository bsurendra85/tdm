webpackJsonp([11],{vfGR:function(s,n){s.exports=[{file:"exclude-disable-hidden-state.component.ts",code:'<span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@angular/core\'</span>;\n\n<span class="hljs-keyword">import</span> { User } <span class="hljs-keyword">from</span> <span class="hljs-string">\'../models\'</span>;\n\n<span class="hljs-meta">@Component</span>({\n  selector: <span class="hljs-string">\'form-exclude-disable-hidden-state\'</span>,\n  templateUrl: <span class="hljs-string">\'./exclude-disable-hidden-state.component.html\'</span>,\n  styleUrls: [ <span class="hljs-string">\'./exclude-disable-hidden-state.component.scss\'</span> ]\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> ExcludeDisableHiddenStateComponent {\n\n  model = <span class="hljs-keyword">new</span> User();\n  modelExcludeDisabled = <span class="hljs-keyword">new</span> User();\n\n  controlState = { exclude: [], disabled: [], hidden: [] };\n  controlStateExcludeDisabled = { exclude: [<span class="hljs-string">\'name\'</span>], disabled: [], hidden: [] };\n\n  handleControlState(state: <span class="hljs-built_in">string</span>[], name: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span> {\n    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {\n      <span class="hljs-keyword">const</span> idx = state.indexOf(name);\n      <span class="hljs-keyword">if</span> (idx === <span class="hljs-number">-1</span>) {\n        state.push(name);\n      } <span class="hljs-keyword">else</span> {\n        state.splice(idx, <span class="hljs-number">1</span>);\n      }\n    });\n  }\n}\n',lang:"ts",title:"Component"},{file:"exclude-disable-hidden-state.component.html",code:'  <span class="hljs-tag">&lt;<span class="hljs-name">dynamic-form</span> [<span class="hljs-attr">model</span>]=<span class="hljs-string">"model"</span>\n                [<span class="hljs-attr">exclude</span>]=<span class="hljs-string">"controlState.exclude"</span>\n                [<span class="hljs-attr">disabledState</span>]=<span class="hljs-string">"controlState.disabled"</span>\n                [<span class="hljs-attr">hiddenState</span>]=<span class="hljs-string">"controlState.hidden"</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">dynamic-form</span>&gt;</span>',lang:"html",section:"TDM-DEMO",title:"Template"},{file:"exclude-disable-hidden-state.component.scss",code:'<span class="hljs-selector-class">.form-wrapper-right-drawer</span> {\n  <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;\n}\n',lang:"scss",title:"Style"},{file:"user.ts",code:'<span class="hljs-keyword">import</span> { Model } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/core\'</span>;\n<span class="hljs-keyword">import</span> { FormModel, FormProp } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Model</span>()\n<span class="hljs-meta">@FormModel</span>()\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> User {\n  <span class="hljs-meta">@FormProp</span>({\n    required: <span class="hljs-literal">true</span>,\n    render: {\n      <span class="hljs-keyword">type</span>: <span class="hljs-string">\'text\'</span>,\n      label: <span class="hljs-string">\'User Name\'</span>\n    }\n  })\n  name: <span class="hljs-built_in">string</span>;\n\n  <span class="hljs-meta">@FormProp</span>({\n    render: {\n      <span class="hljs-keyword">type</span>: <span class="hljs-string">\'text\'</span>,\n      label: <span class="hljs-string">\'User Email Address\'</span>\n    }\n  })\n  email: <span class="hljs-built_in">string</span>;\n\n  <span class="hljs-meta">@FormProp</span>({\n    flatten: {\n      street: {\n        required: <span class="hljs-literal">true</span>,\n        render: {\n          <span class="hljs-keyword">type</span>: <span class="hljs-string">\'text\'</span>,\n          label: <span class="hljs-string">\'Street\'</span>\n        }\n      },\n      city: {\n        required: <span class="hljs-literal">true</span>,\n        render: {\n          <span class="hljs-keyword">type</span>: <span class="hljs-string">\'text\'</span>,\n          label: <span class="hljs-string">\'City\'</span>\n        }\n      },\n      zip: {\n        render: {\n          <span class="hljs-keyword">type</span>: <span class="hljs-string">\'number\'</span>,\n          label: <span class="hljs-string">\'ZIP\'</span>\n        }\n      },\n      state: {\n        defaultValue: <span class="hljs-string">\'CA\'</span>,\n        render: {\n          label: <span class="hljs-string">\'State\'</span>,\n          <span class="hljs-keyword">type</span>: <span class="hljs-string">\'select\'</span>,\n          data: {\n            selections: [\n              { value: <span class="hljs-string">\'CA\'</span>, label: <span class="hljs-string">\'California\'</span> },\n              { value: <span class="hljs-string">\'NY\'</span>, label: <span class="hljs-string">\'New York\'</span> },\n              { value: <span class="hljs-string">\'WA\'</span>, label: <span class="hljs-string">\'Washington\'</span> },\n              { value: <span class="hljs-string">\'NJ\'</span>, label: <span class="hljs-string">\'New Jersey\'</span> }\n            ]\n          }\n        }\n      }\n    }\n  })\n  address: {\n    street: <span class="hljs-built_in">string</span>;\n    city: <span class="hljs-built_in">string</span>;\n    zip: <span class="hljs-built_in">number</span>;\n    state: <span class="hljs-string">\'CA\'</span> | <span class="hljs-string">\'NY\'</span> | <span class="hljs-string">\'GA\'</span> | <span class="hljs-string">\'WY\'</span>;\n  };\n}\n',lang:"ts",title:"Model"}]}});
//# sourceMappingURL=ExcludeDisableHiddenStateComponent.14d45a0c5c138ef01b71.chunk.js.map