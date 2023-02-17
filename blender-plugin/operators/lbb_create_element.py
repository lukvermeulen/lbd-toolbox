import json
from bpy.types import Operator
import bpy
from . api import representation
from . api import element


class LBB_OT_CreateElement(Operator):
    bl_idname = "object.create_element"
    bl_label = "Create Element"
    bl_description = "Create an element with representation"

    @classmethod
    def poll(cls, context):
        obj = context.object

        if obj is not None:
            if obj.mode == "OBJECT":
                return True

    def execute(self, context):

        selected_object = context.object

        res = representation.add_mesh(
            selected_object.name, bpy.data.filepath)

        repName = json.loads(res)[0].get("result").get("data")
        self.report({"INFO"}, repName)

        res = element.add_element(
            name=selected_object.name, buildingelementClass="https://pi.pauwel.be/voc/buildingelement#BuildingElement")

        elName = json.loads(res)[0].get("result").get("data")
        self.report({"INFO"}, elName)

        res = representation.represented_by(
            "http://example.org/"+elName, "http://example.org/"+repName, "active")
        self.report({"INFO"}, res)

        return {'FINISHED'}
