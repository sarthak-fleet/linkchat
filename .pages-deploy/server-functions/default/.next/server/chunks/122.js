exports.id=122,exports.ids=[122],exports.modules={17477:(a,b,c)=>{"use strict";Object.defineProperty(b,"I",{enumerable:!0,get:function(){return g}});let d=c(69565),e=c(86408),f=c(55783);async function g(a,b,c,g){if((0,d.isNodeNextResponse)(b)){var h;b.statusCode=c.status,b.statusMessage=c.statusText;let d=["set-cookie","www-authenticate","proxy-authenticate","vary"];null==(h=c.headers)||h.forEach((a,c)=>{if("x-middleware-set-cookie"!==c.toLowerCase())if("set-cookie"===c.toLowerCase())for(let d of(0,f.splitCookiesString)(a))b.appendHeader(c,d);else{let e=void 0!==b.getHeader(c);(d.includes(c.toLowerCase())||!e)&&b.appendHeader(c,a)}});let{originalResponse:i}=b;c.body&&"HEAD"!==a.method?await (0,e.pipeToNodeResponse)(c.body,i,g):i.end()}}},19536:(a,b,c)=>{"use strict";a.exports=c(44870)},20944:()=>{},30672:()=>{},49472:(a,b,c)=>{"use strict";c.d(b,{AY:()=>i,Ac:()=>h,B9:()=>j,MH:()=>q,bG:()=>o,j4:()=>g,nH:()=>f,nX:()=>s,s_:()=>p,tS:()=>n,tt:()=>k,vk:()=>r,yS:()=>l,z$:()=>m});let d=/^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$/,e=["image/jpeg","image/png","image/webp","image/gif","image/avif"],f=5242880,g=Math.floor(5);function h(a){return d.test(a)}function i(a){try{return new URL(a),!0}catch{return!1}}function j(a){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)}function k(a){return e.includes(a)}let l=5e4,m=500,n=100,o=500,p=2048,q=2e3,r=2e3,s=100},75147:(a,b,c)=>{"use strict";c.a(a,async(a,d)=>{try{c.r(b),c.d(b,{accounts:()=>h,contactSubmissions:()=>q,conversations:()=>s,generatedPages:()=>l,infoBlocks:()=>o,links:()=>m,messages:()=>t,pageEvents:()=>r,pageSections:()=>p,pages:()=>k,projects:()=>n,sessions:()=>i,users:()=>g,verificationTokens:()=>j});var e=c(57238),f=a([e]);e=(f.then?(await f)():f)[0];let g=(0,e.sqliteTable)("users",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),name:(0,e.text)("name"),email:(0,e.text)("email").notNull().unique(),emailVerified:(0,e.integer)("emailVerified",{mode:"timestamp"}),image:(0,e.text)("image"),smProjectId:(0,e.text)("smProjectId"),smApiKey:(0,e.text)("smApiKey"),smIndexId:(0,e.text)("smIndexId"),aiEndpointUrl:(0,e.text)("aiEndpointUrl"),aiApiKey:(0,e.text)("aiApiKey"),aiModel:(0,e.text)("aiModel"),createdAt:(0,e.integer)("createdAt",{mode:"timestamp"}).$defaultFn(()=>new Date)}),h=(0,e.sqliteTable)("accounts",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),userId:(0,e.text)("userId").notNull().references(()=>g.id,{onDelete:"cascade"}),type:(0,e.text)("type").notNull(),provider:(0,e.text)("provider").notNull(),providerAccountId:(0,e.text)("providerAccountId").notNull(),refresh_token:(0,e.text)("refresh_token"),access_token:(0,e.text)("access_token"),expires_at:(0,e.integer)("expires_at"),token_type:(0,e.text)("token_type"),scope:(0,e.text)("scope"),id_token:(0,e.text)("id_token"),session_state:(0,e.text)("session_state")}),i=(0,e.sqliteTable)("sessions",{sessionToken:(0,e.text)("sessionToken").primaryKey(),userId:(0,e.text)("userId").notNull().references(()=>g.id,{onDelete:"cascade"}),expires:(0,e.integer)("expires",{mode:"timestamp"}).notNull()}),j=(0,e.sqliteTable)("verificationTokens",{identifier:(0,e.text)("identifier").notNull(),token:(0,e.text)("token").notNull(),expires:(0,e.integer)("expires",{mode:"timestamp"}).notNull()},a=>({compositePk:(0,e.primaryKey)({columns:[a.identifier,a.token]})})),k=(0,e.sqliteTable)("pages",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),userId:(0,e.text)("userId").notNull().references(()=>g.id,{onDelete:"cascade"}),slug:(0,e.text)("slug").notNull().unique(),displayName:(0,e.text)("displayName").notNull(),bio:(0,e.text)("bio"),avatarUrl:(0,e.text)("avatarUrl"),themeConfig:(0,e.text)("themeConfig",{mode:"json"}).$type(),published:(0,e.integer)("published",{mode:"boolean"}).default(!1),chatEnabled:(0,e.integer)("chatEnabled",{mode:"boolean"}).default(!1),chatSystemPrompt:(0,e.text)("chatSystemPrompt"),encyclopediaEnabled:(0,e.integer)("encyclopediaEnabled",{mode:"boolean"}).default(!1),roastEnabled:(0,e.integer)("roastEnabled",{mode:"boolean"}).default(!1),newspaperEnabled:(0,e.integer)("newspaperEnabled",{mode:"boolean"}).default(!1),pageSettings:(0,e.text)("pageSettings",{mode:"json"}).$type(),scrapedContent:(0,e.text)("scrapedContent",{mode:"json"}).$type(),createdAt:(0,e.integer)("createdAt",{mode:"timestamp"}).$defaultFn(()=>new Date),updatedAt:(0,e.integer)("updatedAt",{mode:"timestamp"}).$defaultFn(()=>new Date)}),l=(0,e.sqliteTable)("generatedPages",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),pageId:(0,e.text)("pageId").notNull().references(()=>k.id,{onDelete:"cascade"}),type:(0,e.text)("type").notNull(),content:(0,e.text)("content",{mode:"json"}).$type(),status:(0,e.text)("status").notNull().default("pending"),createdAt:(0,e.integer)("createdAt",{mode:"timestamp"}).$defaultFn(()=>new Date),updatedAt:(0,e.integer)("updatedAt",{mode:"timestamp"}).$defaultFn(()=>new Date)}),m=(0,e.sqliteTable)("links",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),pageId:(0,e.text)("pageId").notNull().references(()=>k.id,{onDelete:"cascade"}),title:(0,e.text)("title").notNull(),url:(0,e.text)("url").notNull(),icon:(0,e.text)("icon"),sortOrder:(0,e.integer)("sortOrder").default(0),enabled:(0,e.integer)("enabled",{mode:"boolean"}).default(!0)}),n=(0,e.sqliteTable)("projects",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),pageId:(0,e.text)("pageId").notNull().references(()=>k.id,{onDelete:"cascade"}),title:(0,e.text)("title").notNull(),url:(0,e.text)("url").notNull(),imageUrl:(0,e.text)("imageUrl"),description:(0,e.text)("description").notNull(),sortOrder:(0,e.integer)("sortOrder").default(0),enabled:(0,e.integer)("enabled",{mode:"boolean"}).default(!0)}),o=(0,e.sqliteTable)("infoBlocks",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),pageId:(0,e.text)("pageId").notNull().references(()=>k.id,{onDelete:"cascade"}),type:(0,e.text)("type").notNull(),title:(0,e.text)("title"),content:(0,e.text)("content").notNull(),smDocumentId:(0,e.text)("smDocumentId"),sortOrder:(0,e.integer)("sortOrder").default(0)}),p=(0,e.sqliteTable)("pageSections",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),pageId:(0,e.text)("pageId").notNull().references(()=>k.id,{onDelete:"cascade"}),type:(0,e.text)("type").notNull(),title:(0,e.text)("title").notNull(),content:(0,e.text)("content"),buttonLabel:(0,e.text)("buttonLabel"),buttonUrl:(0,e.text)("buttonUrl"),sortOrder:(0,e.integer)("sortOrder").default(0),enabled:(0,e.integer)("enabled",{mode:"boolean"}).default(!0)}),q=(0,e.sqliteTable)("contactSubmissions",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),pageId:(0,e.text)("pageId").notNull().references(()=>k.id,{onDelete:"cascade"}),sectionId:(0,e.text)("sectionId"),visitorId:(0,e.text)("visitorId"),name:(0,e.text)("name").notNull(),email:(0,e.text)("email").notNull(),message:(0,e.text)("message").notNull(),createdAt:(0,e.integer)("createdAt",{mode:"timestamp"}).$defaultFn(()=>new Date)}),r=(0,e.sqliteTable)("pageEvents",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),pageId:(0,e.text)("pageId").notNull().references(()=>k.id,{onDelete:"cascade"}),visitorId:(0,e.text)("visitorId"),eventType:(0,e.text)("eventType").notNull(),resourceType:(0,e.text)("resourceType"),resourceId:(0,e.text)("resourceId"),resourceLabel:(0,e.text)("resourceLabel"),metadata:(0,e.text)("metadata",{mode:"json"}).$type(),createdAt:(0,e.integer)("createdAt",{mode:"timestamp"}).$defaultFn(()=>new Date)}),s=(0,e.sqliteTable)("conversations",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),pageId:(0,e.text)("pageId").notNull().references(()=>k.id,{onDelete:"cascade"}),visitorId:(0,e.text)("visitorId"),createdAt:(0,e.integer)("createdAt",{mode:"timestamp"}).$defaultFn(()=>new Date)}),t=(0,e.sqliteTable)("messages",{id:(0,e.text)("id").primaryKey().$defaultFn(()=>crypto.randomUUID()),conversationId:(0,e.text)("conversationId").notNull().references(()=>s.id,{onDelete:"cascade"}),role:(0,e.text)("role").notNull(),content:(0,e.text)("content").notNull(),createdAt:(0,e.integer)("createdAt",{mode:"timestamp"}).$defaultFn(()=>new Date)});d()}catch(a){d(a)}})},94974:(a,b,c)=>{"use strict";c.a(a,async(a,d)=>{try{c.d(b,{L:()=>i,db:()=>k});var e=c(39751),f=c(28562),g=c(75147),h=a([e,f,g]);[e,f,g]=h.then?(await h)():h;let j=(0,f.createClient)({url:process.env.TURSO_DATABASE_URL,authToken:process.env.TURSO_AUTH_TOKEN}),k=(0,e.drizzle)(j,{schema:g}),l=null;async function i(){l||(l=(async()=>{await j.execute(`
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