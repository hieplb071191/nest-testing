import { datasource } from "./typeorm.config";
import { DataSource } from "typeorm";


export const source = new DataSource(datasource)