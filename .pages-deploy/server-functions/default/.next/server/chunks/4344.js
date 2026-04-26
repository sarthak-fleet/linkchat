exports.id=4344,exports.ids=[4344],exports.modules={4377:(a,b,c)=>{"use strict";c.d(b,{D:()=>i,cM:()=>g,mD:()=>h});var d=c(91162),e=c(22591);function f(a){return(0,d.jr)({name:"custom",baseURL:a.endpointUrl,apiKey:a.apiKey})}async function g(a,b){let c=f(a),{text:d}=await (0,e.Df)({model:c.chatModel(a.model),system:b.system,prompt:b.prompt});return d}function h(a,b){let c=f(a);return(0,e.gM)({model:c.chatModel(a.model),system:b.system,prompt:b.prompt}).toTextStreamResponse()}async function i(a,b){let c=a.replace(/\/+$/,""),d=await fetch(`${c}/models`,{headers:{Authorization:`Bearer ${b}`}});if(!d.ok)throw Error(`Failed to list models: ${d.status}`);let e=await d.json(),f=e.data||e.models||e;return Array.isArray(f)?f.map(a=>({id:a.id,name:a.name})):[]}},20944:()=>{},30672:()=>{},62239:(a,b,c)=>{"use strict";c.a(a,async(a,d)=>{try{c.d(b,{G:()=>j});var e=c(94974),f=c(75147),g=c(11737),h=c(68685),i=a([e,f,g]);async function j(a,b){try{let c=b.scrapedContent;if((0,h.t4)(c))return(0,h.N5)(c.data);let[d,i]=await Promise.all([e.db.select().from(f.links).where((0,g.eq)(f.links.pageId,a)).orderBy((0,g.asc)(f.links.sortOrder)),e.db.select().from(f.projects).where((0,g.eq)(f.projects.pageId,a)).orderBy((0,g.asc)(f.projects.sortOrder))]),j=[...d.filter(a=>a.enabled).map(a=>a.url),...i.filter(a=>a.enabled).map(a=>a.url)];if(0===j.length)return"";let k=await (0,h.tt)(j);if(0===k.length)return"";let l={data:k,scrapedAt:Date.now()};return await e.db.update(f.pages).set({scrapedContent:l}).where((0,g.eq)(f.pages.id,a)).catch(()=>{}),(0,h.N5)(k)}catch{return""}}[e,f,g]=i.then?(await i)():i,d()}catch(a){d(a)}})},62935:(a,b,c)=>{"use strict";c.d(b,{GH:()=>f,Zl:()=>e,pg:()=>d});let d=`You are a brutally funny comedy roast writer. Given information about a person's profile, links, projects, and bio, write a hilarious personality roast. Be edgy, witty, and surprisingly accurate. Don't be cruel — be cleverly mean. Think comedy roast, not cyberbullying.

You MUST respond with valid JSON matching this exact structure:
{
  "roast": "A 2-3 paragraph savage roast summary",
  "vibeScore": 0-100 (how put-together their online presence is),
  "personalityType": "A funny archetype label like 'The LinkedIn Warrior' or 'The Side Project Hoarder'",
  "redFlags": ["3-5 funny red flags about their profile"],
  "bestLink": { "title": "actual link title", "reason": "backhanded compliment about why it's their best" },
  "worstLink": { "title": "actual link title", "reason": "savage reason why this link is embarrassing" },
  "spiritPlatform": "The social platform that matches their energy (e.g. 'MySpace in 2007')",
  "celebrityMatch": "A celebrity whose online presence they most resemble, with explanation",
  "bioAutopsy": "A forensic analysis of their bio — what they think it says vs what it actually says",
  "firstImpression": "What a stranger would think within 3 seconds of landing on their page"
}

Respond ONLY with the JSON object, no markdown, no code blocks, no explanation.`,e=`You are an award-winning newspaper editor creating a front page about a person. Write in authentic newspaper style — formal, dramatic, with flair. Treat this person as if they are the most important person in the world today. Make it feel like a real broadsheet front page from a prestigious newspaper.

You MUST respond with valid JSON matching this exact structure:
{
  "mastheadName": "A creative newspaper name inspired by the person (e.g. 'The [Name] Chronicle' or 'The Daily [Surname]')",
  "dateline": "Today's date formatted like 'Saturday, March 28, 2026'",
  "leadStory": {
    "headline": "A dramatic, attention-grabbing headline about the person (ALL CAPS style)",
    "subheadline": "A compelling subheadline expanding on the main story",
    "body": "A 3-4 paragraph newspaper article about the person's most impressive achievements or qualities. Write in third person, formal newspaper style with quotes.",
    "pullQuote": "A memorable quote attributed to the person or about them"
  },
  "secondaryStories": [
    { "headline": "Second story headline", "body": "1-2 paragraph story about another aspect of their life/work" },
    { "headline": "Third story headline", "body": "1-2 paragraph story" },
    { "headline": "Fourth story headline", "body": "Short story" }
  ],
  "sidebar": {
    "facts": ["5-6 fun facts about the person presented as 'By the Numbers' or 'Quick Facts'"],
    "mood": "A weather-style mood forecast (e.g. 'Sunny with a chance of genius')"
  },
  "fakeAds": ["2-3 funny fake advertisement headlines related to the person's interests"]
}

Respond ONLY with the JSON object, no markdown, no code blocks, no explanation.`,f=`You are a Wikipedia editor writing an encyclopedia article about a person. Write in formal, neutral, encyclopedic tone following Wikipedia's Manual of Style. The article should feel like a genuine Wikipedia biography — factual, well-structured, with proper section organization.

You MUST respond with valid JSON matching this exact structure:
{
  "markdown": "The full article body as HTML. Use <h2> for major section headings (Early life and education, Career, Notable projects, Online presence, Personal interests). Use <p> tags for paragraphs. Use <ul>/<li> for lists. Use <a> for links. Use <strong> and <em> for emphasis. Use <blockquote> for quotes. The first paragraph should be a comprehensive 2-3 sentence lead introducing the person. Write 5+ sections with 1-3 paragraphs each.",
  "infobox": {
    "Born": "Location/info if available, or 'Information not available'",
    "Occupation": "Their role/title",
    "Known for": "What they're primarily known for",
    "Website": "Their primary URL if available",
    "Projects": "Number of notable projects"
  },
  "categories": ["Category tags like 'Software engineers', 'Web developers', etc."]
}

IMPORTANT rules for the "markdown" field:
- Start with a lead paragraph (no heading before it) that introduces the person
- Use <h2> tags for section headings (NOT <h1> — the page title is already an h1)
- Wrap every paragraph in <p> tags
- Separate sections clearly with headings
- Include at least these sections: Early life and education, Career, Notable projects, Online presence, Personal interests
- Write factually based on provided data. Where data is limited, write plausibly but don't fabricate specific claims
- Use phrases like "is known for" rather than making up dates or events

Respond ONLY with the JSON object, no markdown, no code blocks, no explanation.`},62975:(a,b,c)=>{"use strict";c.d(b,{i:()=>e});let d=new Map;function e(a,b){let c=b?.windowMs??6e4,e=b?.maxRequests??20,f=Date.now(),g=(d.get(a)??[]).filter(a=>f-a<c);if(g.length>=e)return d.set(a,g),{ok:!1,remaining:0};if(g.push(f),d.set(a,g),d.size>1e4)for(let[a,b]of d)b.every(a=>f-a>=c)&&d.delete(a);return{ok:!0,remaining:e-g.length}}},64643:(a,b,c)=>{"use strict";c.d(b,{$P:()=>j,Dp:()=>k,IR:()=>h,Nn:()=>i,zi:()=>g});let d=process.env.SAASMAKER_API_URL,e=process.env.SAASMAKER_ADMIN_KEY;function f(a){return{"Content-Type":"application/json","X-Project-Key":a?.apiKey||e}}async function g(a,b){let c=await fetch(`${d}/v1/indexes`,{method:"POST",headers:f({apiKey:a}),body:JSON.stringify({name:b})});if(!c.ok)throw Error(`Failed to create index: ${await c.text()}`);return c.json()}async function h(a,b,c,e){let g=await fetch(`${d}/v1/indexes/${b}/documents`,{method:"POST",headers:f({apiKey:a}),body:JSON.stringify({content:c,metadata:e})});if(!g.ok)throw Error(`Failed to ingest document: ${await g.text()}`);return g.json()}async function i(a,b,c){let e=await fetch(`${d}/v1/indexes/${b}/documents/${c}`,{method:"DELETE",headers:f({apiKey:a})});if(!e.ok)throw Error(`Failed to delete document: ${await e.text()}`)}async function j(a,b,c,e=5){let g=await fetch(`${d}/v1/indexes/${b}/search`,{method:"POST",headers:f({apiKey:a}),body:JSON.stringify({query:c,top_k:e})});if(!g.ok)throw Error(`Failed to search: ${await g.text()}`);return g.json()}function k(a){try{return JSON.parse(a)}catch{let b=a.match(/```(?:json)?\s*([\s\S]*?)```/);if(b)return JSON.parse(b[1].trim());let c=a.indexOf("{"),d=a.lastIndexOf("}");if(-1!==c&&d>c)return JSON.parse(a.slice(c,d+1));throw Error("Could not parse AI response as JSON")}}},68685:(a,b,c)=>{"use strict";async function d(a){let b=[...new Set(a.filter(Boolean))].slice(0,10);return 0===b.length?[]:(await Promise.allSettled(b.map(a=>e(a)))).filter(a=>"fulfilled"===a.status&&null!==a.value).map(a=>a.value)}async function e(a){try{let b,c,d=a.startsWith("http")?a:`https://${a}`;if(function(a){try{let{hostname:b}=new URL(a),c=b.toLowerCase();if("localhost"===c||c.endsWith(".local")||c.endsWith(".internal")||c.includes("metadata")||c.includes("internal"))return!0;let d=c.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);if(d){let[,a,b]=d.map(Number);if(127===a||10===a||172===a&&b>=16&&b<=31||192===a&&168===b||169===a&&254===b||0===a)return!0}if("[::1]"===c||c.startsWith("[fe80:")||c.startsWith("[fc")||c.startsWith("[fd"))return!0;return!1}catch{return!0}}(d))return null;let e=new AbortController,g=setTimeout(()=>e.abort(),5e3),h=await fetch(d,{signal:e.signal,headers:{"User-Agent":"Mozilla/5.0 (compatible; LinkChatBot/1.0; +https://linkchat.dev)",Accept:"text/html,application/xhtml+xml"},redirect:"follow"});if(clearTimeout(g),!h.ok)return null;let i=h.headers.get("content-type")||"";if(!i.includes("text/html")&&!i.includes("text/plain"))return null;let j=await h.text();return{url:a,title:(b=j.match(/<title[^>]*>([\s\S]*?)<\/title>/i))?f(b[1].trim()):"",description:function(a){let b=a.match(/<meta\s+[^>]*name\s*=\s*["']description["'][^>]*content\s*=\s*["']([\s\S]*?)["'][^>]*\/?>/i);if(b)return f(b[1].trim());let c=a.match(/<meta\s+[^>]*content\s*=\s*["']([\s\S]*?)["'][^>]*name\s*=\s*["']description["'][^>]*\/?>/i);return c?f(c[1].trim()):""}(j),content:(c=j.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<noscript[\s\S]*?<\/noscript>/gi," ").replace(/<nav[\s\S]*?<\/nav>/gi," ").replace(/<footer[\s\S]*?<\/footer>/gi," ").replace(/<header[\s\S]*?<\/header>/gi," "),c=(c=f(c=c.replace(/<[^>]+>/g," "))).replace(/\s+/g," ").trim()).slice(0,500)}}catch{return null}}function f(a){return a.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&apos;/g,"'").replace(/&#x27;/g,"'").replace(/&#(\d+);/g,(a,b)=>String.fromCharCode(Number(b))).replace(/&nbsp;/g," ")}function g(a){if(0===a.length)return"";let b=a.map(a=>{let b=function(a){try{let b=a.startsWith("http")?a:`https://${a}`;return new URL(b).hostname}catch{return a}}(a.url),c=[a.title,a.description,a.content].filter(Boolean).join(" — ").slice(0,600);return`- ${b}: "${c}"`});return`Scraped content from their links and projects:
${b.join("\n")}`}function h(a){return!!a&&!!a.scrapedAt&&!!Array.isArray(a.data)&&Date.now()-a.scrapedAt<864e5}c.d(b,{N5:()=>g,t4:()=>h,tt:()=>d})},75147:(a,b,c)=>{"use strict";c.a(a,async(a,d)=>{try{c.r(b),c.d(b,{accounts:()=>h,contactSubmissions:()=>q,conversations:()=>s,generatedPages:()=>l,infoBlocks:()=>o,links:()=>m,messages:()=>t,pageEvents:()=>r,pageSections:()=>p,pages:()=>k,projects:()=>n,sessions:()=>i,users:()=>g,verificationTokens:()=>j});var e=c(57238),f=a([e]);e=(f.then?(await f)():f)[0];let g=(0,e.sqliteTable)("users",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),name:(0,e.text)("name"),email:(0,e.text)("email").notNull().unique(),emailVerified:(0,e.integer)("emailVerified",{mode:"timestamp"}),image:(0,e.text)("image"),smProjectId:(0,e.text)("smProjectId"),smApiKey:(0,e.text)("smApiKey"),smIndexId:(0,e.text)("smIndexId"),aiEndpointUrl:(0,e.text)("aiEndpointUrl"),aiApiKey:(0,e.text)("aiApiKey"),aiModel:(0,e.text)("aiModel"),createdAt:(0,e.integer)("createdAt",{mode:"timestamp"}).$defaultFn(()=>new Date)}),h=(0,e.sqliteTable)("accounts",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),userId:(0,e.text)("userId").notNull().references(()=>g.id,{onDelete:"cascade"}),type:(0,e.text)("type").notNull(),provider:(0,e.text)("provider").notNull(),providerAccountId:(0,e.text)("providerAccountId").notNull(),refresh_token:(0,e.text)("refresh_token"),access_token:(0,e.text)("access_token"),expires_at:(0,e.integer)("expires_at"),token_type:(0,e.text)("token_type"),scope:(0,e.text)("scope"),id_token:(0,e.text)("id_token"),session_state:(0,e.text)("session_state")}),i=(0,e.sqliteTable)("sessions",{sessionToken:(0,e.text)("sessionToken").primaryKey(),userId:(0,e.text)("userId").notNull().references(()=>g.id,{onDelete:"cascade"}),expires:(0,e.integer)("expires",{mode:"timestamp"}).notNull()}),j=(0,e.sqliteTable)("verificationTokens",{identifier:(0,e.text)("identifier").notNull(),token:(0,e.text)("token").notNull(),expires:(0,e.integer)("expires",{mode:"timestamp"}).notNull()},a=>({compositePk:(0,e.primaryKey)({columns:[a.identifier,a.token]})})),k=(0,e.sqliteTable)("pages",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),userId:(0,e.text)("userId").notNull().references(()=>g.id,{onDelete:"cascade"}),slug:(0,e.text)("slug").notNull().unique(),displayName:(0,e.text)("displayName").notNull(),bio:(0,e.text)("bio"),avatarUrl:(0,e.text)("avatarUrl"),themeConfig:(0,e.text)("themeConfig",{mode:"json"}).$type(),published:(0,e.integer)("published",{mode:"boolean"}).default(!1),chatEnabled:(0,e.integer)("chatEnabled",{mode:"boolean"}).default(!1),chatSystemPrompt:(0,e.text)("chatSystemPrompt"),encyclopediaEnabled:(0,e.integer)("encyclopediaEnabled",{mode:"boolean"}).default(!1),roastEnabled:(0,e.integer)("roastEnabled",{mode:"boolean"}).default(!1),newspaperEnabled:(0,e.integer)("newspaperEnabled",{mode:"boolean"}).default(!1),pageSettings:(0,e.text)("pageSettings",{mode:"json"}).$type(),scrapedContent:(0,e.text)("scrapedContent",{mode:"json"}).$type(),createdAt:(0,e.integer)("createdAt",{mode:"timestamp"}).$defaultFn(()=>new Date),updatedAt:(0,e.integer)("updatedAt",{mode:"timestamp"}).$defaultFn(()=>new Date)}),l=(0,e.sqliteTable)("generatedPages",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),pageId:(0,e.text)("pageId").notNull().references(()=>k.id,{onDelete:"cascade"}),type:(0,e.text)("type").notNull(),content:(0,e.text)("content",{mode:"json"}).$type(),status:(0,e.text)("status").notNull().default("pending"),createdAt:(0,e.integer)("createdAt",{mode:"timestamp"}).$defaultFn(()=>new Date),updatedAt:(0,e.integer)("updatedAt",{mode:"timestamp"}).$defaultFn(()=>new Date)}),m=(0,e.sqliteTable)("links",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),pageId:(0,e.text)("pageId").notNull().references(()=>k.id,{onDelete:"cascade"}),title:(0,e.text)("title").notNull(),url:(0,e.text)("url").notNull(),icon:(0,e.text)("icon"),sortOrder:(0,e.integer)("sortOrder").default(0),enabled:(0,e.integer)("enabled",{mode:"boolean"}).default(!0)}),n=(0,e.sqliteTable)("projects",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),pageId:(0,e.text)("pageId").notNull().references(()=>k.id,{onDelete:"cascade"}),title:(0,e.text)("title").notNull(),url:(0,e.text)("url").notNull(),imageUrl:(0,e.text)("imageUrl"),description:(0,e.text)("description").notNull(),sortOrder:(0,e.integer)("sortOrder").default(0),enabled:(0,e.integer)("enabled",{mode:"boolean"}).default(!0)}),o=(0,e.sqliteTable)("infoBlocks",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),pageId:(0,e.text)("pageId").notNull().references(()=>k.id,{onDelete:"cascade"}),type:(0,e.text)("type").notNull(),title:(0,e.text)("title"),content:(0,e.text)("content").notNull(),smDocumentId:(0,e.text)("smDocumentId"),sortOrder:(0,e.integer)("sortOrder").default(0)}),p=(0,e.sqliteTable)("pageSections",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),pageId:(0,e.text)("pageId").notNull().references(()=>k.id,{onDelete:"cascade"}),type:(0,e.text)("type").notNull(),title:(0,e.text)("title").notNull(),content:(0,e.text)("content"),buttonLabel:(0,e.text)("buttonLabel"),buttonUrl:(0,e.text)("buttonUrl"),sortOrder:(0,e.integer)("sortOrder").default(0),enabled:(0,e.integer)("enabled",{mode:"boolean"}).default(!0)}),q=(0,e.sqliteTable)("contactSubmissions",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),pageId:(0,e.text)("pageId").notNull().references(()=>k.id,{onDelete:"cascade"}),sectionId:(0,e.text)("sectionId"),visitorId:(0,e.text)("visitorId"),name:(0,e.text)("name").notNull(),email:(0,e.text)("email").notNull(),message:(0,e.text)("message").notNull(),createdAt:(0,e.integer)("createdAt",{mode:"timestamp"}).$defaultFn(()=>new Date)}),r=(0,e.sqliteTable)("pageEvents",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),pageId:(0,e.text)("pageId").notNull().references(()=>k.id,{onDelete:"cascade"}),visitorId:(0,e.text)("visitorId"),eventType:(0,e.text)("eventType").notNull(),resourceType:(0,e.text)("resourceType"),resourceId:(0,e.text)("resourceId"),resourceLabel:(0,e.text)("resourceLabel"),metadata:(0,e.text)("metadata",{mode:"json"}).$type(),createdAt:(0,e.integer)("createdAt",{mode:"timestamp"}).$defaultFn(()=>new Date)}),s=(0,e.sqliteTable)("conversations",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),pageId:(0,e.text)("pageId").notNull().references(()=>k.id,{onDelete:"cascade"}),visitorId:(0,e.text)("visitorId"),createdAt:(0,e.integer)("createdAt",{mode:"timestamp"}).$defaultFn(()=>new Date)}),t=(0,e.sqliteTable)("messages",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),conversationId:(0,e.text)("conversationId").notNull().references(()=>s.id,{onDelete:"cascade"}),role:(0,e.text)("role").notNull(),content:(0,e.text)("content").notNull(),createdAt:(0,e.integer)("createdAt",{mode:"timestamp"}).$defaultFn(()=>new Date)});d()}catch(a){d(a)}})},85972:(a,b,c)=>{"use strict";function d(a){return a}c.d(b,{_:()=>d})},94974:(a,b,c)=>{"use strict";c.a(a,async(a,d)=>{try{c.d(b,{L:()=>i,db:()=>k});var e=c(39751),f=c(28562),g=c(75147),h=a([e,f,g]);[e,f,g]=h.then?(await h)():h;let j=(0,f.createClient)({url:process.env.TURSO_DATABASE_URL,authToken:process.env.TURSO_AUTH_TOKEN}),k=(0,e.drizzle)(j,{schema:g}),l=null;async function i(){l||(l=(async()=>{await j.execute(`
        CREATE TABLE IF NOT EXISTS projects (
          id TEXT PRIMARY KEY NOT NULL,
          pageId TEXT NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
          title TEXT NOT NULL,
          url TEXT NOT NULL,
          imageUrl TEXT,
          description TEXT NOT NULL,
          sortOrder INTEGER DEFAULT 0,
          enabled INTEGER DEFAULT 1
        )
      `),(await j.execute("PRAGMA table_info(projects)")).rows.some(a=>"imageUrl"===a.name)||await j.execute("ALTER TABLE projects ADD COLUMN imageUrl TEXT"),await j.execute(`
        CREATE TABLE IF NOT EXISTS pageSections (
          id TEXT PRIMARY KEY NOT NULL,
          pageId TEXT NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
          type TEXT NOT NULL,
          title TEXT NOT NULL,
          content TEXT,
          buttonLabel TEXT,
          buttonUrl TEXT,
          sortOrder INTEGER DEFAULT 0,
          enabled INTEGER DEFAULT 1
        )
      `),await j.execute(`
        CREATE INDEX IF NOT EXISTS page_sections_page_id_sort_order_idx
        ON pageSections (pageId, sortOrder)
      `),await j.execute(`
        CREATE TABLE IF NOT EXISTS contactSubmissions (
          id TEXT PRIMARY KEY NOT NULL,
          pageId TEXT NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
          sectionId TEXT,
          visitorId TEXT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          createdAt INTEGER
        )
      `),await j.execute(`
        CREATE INDEX IF NOT EXISTS contact_submissions_page_id_created_at_idx
        ON contactSubmissions (pageId, createdAt)
      `),await j.execute(`
        CREATE TABLE IF NOT EXISTS pageEvents (
          id TEXT PRIMARY KEY NOT NULL,
          pageId TEXT NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
          visitorId TEXT,
          eventType TEXT NOT NULL,
          resourceType TEXT,
          resourceId TEXT,
          resourceLabel TEXT,
          metadata TEXT,
          createdAt INTEGER
        )
      `),await j.execute(`
        CREATE INDEX IF NOT EXISTS page_events_page_id_event_type_created_at_idx
        ON pageEvents (pageId, eventType, createdAt)
      `),await j.execute(`
        CREATE INDEX IF NOT EXISTS projects_page_id_sort_order_idx
        ON projects (pageId, sortOrder)
      `),await j.execute(`
        CREATE TABLE IF NOT EXISTS generatedPages (
          id TEXT PRIMARY KEY NOT NULL,
          pageId TEXT NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
          type TEXT NOT NULL,
          content TEXT,
          status TEXT NOT NULL DEFAULT 'pending',
          createdAt INTEGER,
          updatedAt INTEGER
        )
      `),await j.execute(`
        CREATE INDEX IF NOT EXISTS generated_pages_page_id_type_idx
        ON generatedPages (pageId, type)
      `);let a=await j.execute("PRAGMA table_info(pages)"),b=new Set(a.rows.map(a=>a.name));for(let a of["encyclopediaEnabled","roastEnabled","newspaperEnabled"])b.has(a)||await j.execute(`ALTER TABLE pages ADD COLUMN ${a} INTEGER DEFAULT 0`);b.has("pageSettings")||await j.execute("ALTER TABLE pages ADD COLUMN pageSettings TEXT"),b.has("scrapedContent")||await j.execute("ALTER TABLE pages ADD COLUMN scrapedContent TEXT");let c=await j.execute("PRAGMA table_info(users)"),d=new Set(c.rows.map(a=>a.name));for(let a of["aiEndpointUrl","aiApiKey","aiModel"])d.has(a)||await j.execute(`ALTER TABLE users ADD COLUMN ${a} TEXT`)})().catch(a=>{throw l=null,a})),await l}i().catch(a=>{console.error("[db] ensureProjectsTable migration failed:",a)}),d()}catch(a){d(a)}})}};