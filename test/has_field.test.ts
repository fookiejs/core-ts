import * as lodash from "lodash"
import { it, describe, assert } from "vitest"
import { model, lifecycle, mixin } from "../packages/builder"
import { run } from "../packages/run"
import * as Database from "../packages/database"
import { Create, Read, Count, Delete, Test, Update } from "../packages/method"
import * as Type from "../packages/type"
import * as Mixin from "../packages/mixin"
import * as Role from "../packages/role"

it("Has field", async function () {
    const has_field_model = await model({
        name: "hf_model",
        database: Database.Store,
        schema: {
            field: {
                type: Type.Text,
                required: true,
            },
        },
        bind: {
            test: {},
            create: {},
            delete: {},
            read: {},
            count: {},
        },
    })

    const res = await run({
        model: has_field_model,
        method: Create,
        body: {
            abc: "hello",
        },
    })

    assert.equal(res.status, false)
    assert.equal(res.error, "has_field")
})
