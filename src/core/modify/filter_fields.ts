import { lifecycle } from "../.."

export default async function (payload, state) {
    const model = ctx.local.get("model", payload.model)
    for (let field of payload.query.attributes) {
        let attr_roles = ctx.lodash.has(model.schema[field], "read") ? model.schema[field].read : []
        let show = true
        for (const role of attr_roles) {
            const res = await ctx.local.get("lifecycle", role).function(payload, state)
            show = show && res
        }
        if (!show) {
            payload.query.attributes = ctx.lodash.pull(payload.query.attributes, field)
        }
    }
}