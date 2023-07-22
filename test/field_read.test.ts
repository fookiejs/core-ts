import * as lodash from "lodash"
import { it, describe, assert } from "vitest"
import { model, run, models, lifecycle } from "../packages/core"
import { Store } from "../packages/database"
import { Model, Field } from "../packages/decorator"
import { Create, Read, Count, Delete, Test, Update } from "../packages/method"
import { Text, Array, Boolean, Buffer, Char, Function, Plain } from "../packages/type"
import { After, Before } from "../packages/mixin"
import { nobody, everybody, system } from "../packages/role"

it("read:['nobody'] -> empty field", async function () {
    let test_field_read = await model({
        name: "test_field_read",
        database: Store,
        schema: {
            msg: {
                type: Text,
                read: [nobody],
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

    await run({
        model: test_field_read,
        method: Create,
        body: {
            msg: "hi",
        },
    })

    let read_res = await run({
        model: test_field_read,
        method: "read",
        query: {
            filter: {},
        },
    })

    assert.equal(read_res.data[0].msg, undefined)
})
