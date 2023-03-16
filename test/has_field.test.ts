import { it, describe, assert } from "vitest"
import { model, run, models } from "../src"
import { Store } from "../src/databases"
import { Model, Field } from "../src/decorators"
import { Create, Read } from "../src/methods"
import { Text } from "../src/types"
import * as lodash from "lodash"

it("async effect", async function () {
    await run({
        token: "system_token",
        model: "model",
        method: "create",
        body: {
            name: "hf_model",
            database: Store,
            schema: {
                field: {
                    type: Text,
                    required: true,
                },
            },
        },
    })

    const res = await run({
        model: "hf_model",
        method: "create",
        body: {
            abc: "hello",
        },
    })
    assert.equal(res.status, false)
    assert.equal(res.error, "has_field")
})