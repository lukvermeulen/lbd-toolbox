import bpy

from bpy.types import Panel


class LBB_PT_Panel(Panel):
    bl_space_type = "VIEW_3D"
    bl_region_type = "UI"
    bl_label = "Linked Data Operations"
    bl_category = "Linked Data BIM Box"

    def draw(self, context):
        layout = self.layout

        layout.label(text="LBD toolbox asdf")

        # add topology
        topologies = ["Space", "Storey", "Building", "Site"]

        # Get the selected option
        selected_index = int(context.scene.topology_dropdown)
        selected_option = topologies[selected_index]

        box = layout.box()
        box.label(text="Topology")
        box.prop(context.scene, "text_input", text="Name")
        box.prop(context.scene, "topology_dropdown", text="Class")

        row = box.row()
        row.operator("object.create_element", text="Add topology")

        # create representation
        box = layout.box()
        box.label(text="Representations")

        box.prop(context.scene, "text_input", text="Name")

        row = box.row()
        row.operator("object.create_representation",
                     text="Create representation")

        # create element
        array = ["Wall", "Window", "Slab", "Door"]

        # Get the selected option
        selected_index = int(context.scene.array_dropdown_index)
        selected_option = array[selected_index]

        box = layout.box()
        box.label(text="Elements")
        box.prop(context.scene, "text_input", text="Name")
        box.prop(context.scene, "array_dropdown_index", text="Class")

        row = box.row()
        row.operator("object.create_element", text="Create element")

        # make links
        box = layout.box()
        box.label(text="Make links")

        row = box.row()
        row.operator("object.create_element", text="representedBy")

        # information migration
        box = layout.box()
        box.label(text="Information")

        row = box.row()
        row.operator("object.create_element", text="Copy information")

        row = box.row()
        row.operator("object.create_element", text="LBD Props from IFC")

        # footer
        layout.label(text="by Luk Vermeulen 2023")
