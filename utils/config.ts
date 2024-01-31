import fs from "fs";
import path from "path";
import YAML from "yaml";

const f = fs.readFileSync(path.join(path.resolve(), '_config.yaml'), 'utf8');

export default YAML.parse(f);
