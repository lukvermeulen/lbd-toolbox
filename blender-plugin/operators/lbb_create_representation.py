import json
from bpy.types import Operator
import bpy
from . api import representation


class LBB_OT_CreateRepresentation(Operator):
    bl_idname = "object.create_representation"
    bl_label = "Create Representation"
    bl_description = "Create a mesh representation"

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

        return {'FINISHED'}
