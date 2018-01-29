webpackJsonp([15],{"+BXF":function(s,n){s.exports=[{file:"README.md",lang:"md",section:"part1",code:'<p>A <strong>Model</strong> is a class with metadata information.\nThe metadata can be anything, but at the core every model contains information about the\nproperties and methods it has including information about their types.</p>\n<p>This alone is not enough information to render a form, we need more\ninformation such as label, order, type, etc...</p>\n<div class="info">\n  Although a <strong>Model</strong> contains type information for the properties it\n  has, they differ from the <strong>type</strong> required for a form control.\n\n  A <code>boolean</code> type can display as a slide toggle or as a checkbox. A\n  <code>number</code> type display as input or slider...\n</div>\n\n<p>We start with a simple class, our famous hero:</p>\n<pre class="lang-ts"><code class="lang-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Hero {\n  id: <span class="hljs-built_in">number</span>;\n  name: <span class="hljs-built_in">string</span>;\n  superHero: <span class="hljs-built_in">boolean</span>;\n}\n</code></pre>\n<p>Now, let&#39;s make it a model by decorating the class:</p>\n<pre class="lang-ts"><code class="lang-ts"><span class="hljs-keyword">import</span> { Model } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Model</span>()\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Hero {\n  id: <span class="hljs-built_in">number</span>;\n  name: <span class="hljs-built_in">string</span>;\n  superHero: <span class="hljs-built_in">boolean</span>;\n}\n</code></pre>\n<div class="info">\n  A <code>Model</code> is the most basic representation, defined in <code>@tdm/core</code>, it is\n  extended by other <code>@tdm</code> packages to provide more functionality.\n</div>\n\n<div class="info">\n  A <code>@Model()</code> decorator accepts an optional metadata argument object.\n</div>\n\n<p>We need to declare this model as a model that can render to and from a\nform, we do that by decorating with <code>@FormModel</code>:</p>\n<pre class="lang-ts"><code class="lang-ts"><span class="hljs-keyword">import</span> { Model, FormModel } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Model</span>()\n<span class="hljs-meta">@FormModel</span>()\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Hero {\n  id: <span class="hljs-built_in">number</span>;\n  name: <span class="hljs-built_in">string</span>;\n  superHero: <span class="hljs-built_in">boolean</span>;\n}\n</code></pre>\n<p>or, use the short syntax:</p>\n<pre class="lang-ts"><code class="lang-ts"><span class="hljs-keyword">import</span> { Model } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Model</span>({\n  form: <span class="hljs-literal">true</span> <span class="hljs-comment">// or metadata arguments</span>\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Hero {\n  id: <span class="hljs-built_in">number</span>;\n  name: <span class="hljs-built_in">string</span>;\n  superHero: <span class="hljs-built_in">boolean</span>;\n}\n</code></pre>\n<p>The <code>@FormModel</code> decorator (and short-syntax) accepts an optional\nmetadata argument object:</p>\n<pre class="lang-ts"><code class="lang-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> FormModelMetadataArgs {\n  validator?: ValidatorFn;\n  asyncValidator?: AsyncValidatorFn;\n}\n</code></pre>\n<p>Great, our model class can now transform from a <code>Hero</code> instance into a\n<code>FormGroup</code> instance and backwards.</p>\n<p>Our next step is to define how the properties in this model render as\nform controls, this involves a bit more detail, let&#39;s start with just\nthe <code>id</code> property:</p>\n<pre class="lang-ts"><code class="lang-ts"><span class="hljs-keyword">import</span> { Model, FormProp } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@FormProp</span>({\n  render: {\n    <span class="hljs-keyword">type</span>: <span class="hljs-string">\'number\'</span>,\n    label: <span class="hljs-string">\'Hero ID\'</span>\n  }\n})\nid: <span class="hljs-built_in">number</span>;\n</code></pre>\n<p>or, use the short syntax:</p>\n<pre class="lang-ts"><code class="lang-ts"><span class="hljs-keyword">import</span> { Model, Prop } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Prop</span>({\n  form: {\n    render: {\n      <span class="hljs-keyword">type</span>: <span class="hljs-string">\'number\'</span>,\n      label: <span class="hljs-string">\'Hero ID\'</span>\n    }\n  }\n})\nid: <span class="hljs-built_in">number</span>;\n</code></pre>\n<div class="info">\n  <code>@Prop()</code> is also a <code>@tdm/core</code> decorator, same as <code>@Model</code> but for\n  class members. It is also extended by other <code>@tdm</code> packages.\n\n  It is recommended to use <code>@Prop</code> over <code>@FormProp</code> as <code>@Prop</code> is used\n  by other <code>@tdm</code> packages.\n\n  For example, A model can be used to created forms (<strong>FormModel</strong>) and\n  as a resource (<strong>HttpResource</strong>) for making HTTP requests via\n  <code>ngx-http-client</code>.\n</div>\n\n\n<p>The <code>@FormProp</code> decorator (and short-syntax) accepts the\n<code>FormPropMetadataArgs</code> object.</p>\n<p>We only defined the <code>render</code> property which configure how a form\nrenders, other properties offer additional features and behaviour\nsettings. The <code>render</code> object contains other optional properties as well.</p>\n<p>We will cover most of the options as we progress, to get a better\nunderstanding you can explore the <code>FormPropMetadataArgs</code> and any child\ntype and read the JSDoc comments for every option.</p>\n<p>Now, let&#39;s complete the whole class:</p>\n<pre class="lang-ts"><code class="lang-ts"><span class="hljs-keyword">import</span> { Model, Prop } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Model</span>({\n  form: <span class="hljs-literal">true</span>\n})\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Hero {\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        <span class="hljs-keyword">type</span>: <span class="hljs-string">\'number\'</span>,\n        label: <span class="hljs-string">\'Hero ID\'</span>\n      }\n    }\n  })\n  id: <span class="hljs-built_in">number</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        <span class="hljs-keyword">type</span>: <span class="hljs-string">\'text\'</span>,\n        label: <span class="hljs-string">\'Hero Name\'</span>\n      }\n    }\n  })\n  name: <span class="hljs-built_in">string</span>;\n\n  <span class="hljs-meta">@Prop</span>({\n    form: {\n      render: {\n        <span class="hljs-keyword">type</span>: <span class="hljs-string">\'boolean\'</span>,\n        label: <span class="hljs-string">\'Super Hero\'</span>\n      }\n    }\n  })\n  superHero: <span class="hljs-built_in">boolean</span>;\n}\n</code></pre>\n<p>Straight forward, for every property we want rendered in a form\nwe defined a type and a label for display.</p>\n<div class="info">\n  We will be using the short-syntax notation where possible.<br>\n  Because <code>@Model</code> and <code>@Prop</code> are <code>@tdm/core</code> constructs you might bump\n  into different import statements for them:<br>\n    - <code>import { Model, Prop } from &#39;@tdm/core&#39;;</code><br>    - <code>import { Model, Prop } from &#39;@tdm/ngx-http-client&#39;;</code><br>    - <code>import { Model, Prop } from &#39;@tdm/ngx-dynamic-forms&#39;;</code><br>\n\n  These are all similar, re-exported for convenience.\n\n</div>',title:"Setup"},{file:"model.ts",lang:"ts",section:"default",code:'<span class="hljs-keyword">import</span> { Model } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n<span class="hljs-keyword">import</span> { FormModel, FormProp } <span class="hljs-keyword">from</span> <span class="hljs-string">\'@tdm/ngx-dynamic-forms\'</span>;\n\n<span class="hljs-meta">@Model</span>()\n<span class="hljs-meta">@FormModel</span>()\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Hero {\n  <span class="hljs-meta">@FormProp</span>({\n    render: {\n      label: <span class="hljs-string">\'Hero ID\'</span>\n    }\n  })\n  id: <span class="hljs-built_in">number</span>;\n\n  <span class="hljs-meta">@FormProp</span>({\n    render: {\n      label: <span class="hljs-string">\'Hero Name\'</span>\n    }\n  })\n  name: <span class="hljs-built_in">string</span>;\n\n  <span class="hljs-meta">@FormProp</span>({\n    render: {\n      label: <span class="hljs-string">\'Super Hero\'</span>\n    }\n  })\n  superHero: <span class="hljs-built_in">boolean</span>;\n}\n',title:"Model"}]}});
//# sourceMappingURL=CreatingAModelComponent.2e0c3ea82768fda4fc76.chunk.js.map