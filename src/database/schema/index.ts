import { appSchema } from "@nozbe/watermelondb";

import userSchema from "./userSchema";
import carSchema from "./carSchema";

const schemas = appSchema({
  version: 1, //Sempre que acrecentar novos schemas e models, atualize a versão para que suba no projeto as alterações
  tables: [userSchema, carSchema],
});

export default schemas;
