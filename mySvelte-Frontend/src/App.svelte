<script>

import { Router, Link, Route } from "svelte-routing";
import signUp from "./routes/signUp.svelte";
import login from "./routes/login.svelte";
import list from "./routes/list.svelte";
import home from "./routes/home.svelte";
import item from "./routes/item/[id].svelte";

</script>
    
<style>		

</style>
    
<Router>
  <div>
    <Route path="" component="{home}" />
    <Route path="list" component="{list}" />
    <Route path="login" component="{login}" />
    <Route path="signUp" component="{signUp}" />
    <Route path="item/:id" component="{item}"/>
  </div>
</Router>

