YUI.add("moodle-qtype_ddlusher-form", function(e, t) {
    var n = "moodle-qtype_ddlusher-form",
        r = function() { r.superclass.constructor.apply(this, arguments) };
    e.extend(r, M.qtype_ddlusher.dd_base_class, {
        pendingid: "",
        fp: null,
        initializer: function() { this.pendingid = "qtype_ddlusher-form-" + Math.random().toString(36).slice(2), M.util.js_pending(this.pendingid), this.fp = this.file_pickers(); var t = e.one(this.get("topnode"));
            t.one("div.fcontainer").append('<div class="ddarea"><div class="droparea"></div><div class="dragitems"></div><div class="dropzones"></div></div>'), this.doc = this.doc_structure(this), this.draw_dd_area() },
        draw_dd_area: function() { var t = this.fp.file("bgimage").href;
            this.stop_selector_events(), this.set_options_for_drag_item_selectors(); if (t !== null) { this.doc.load_bg_img(t), this.load_drag_homes(); var n = new e.DD.Drop({ node: this.doc.bg_img() });
                n.on("drop:hit", function(e) { e.drag.get("node").setData("gooddrop", !0) }), this.afterimageloaddone = !1, this.doc.bg_img().on("load", this.constrain_image_size, this, "bgimage"), this.doc.drag_item_homes().on("load", this.constrain_image_size, this, "dragimage"), this.doc.bg_img().after("load", this.poll_for_image_load, this, !0, 0, this.after_all_images_loaded), this.doc.drag_item_homes().after("load", this.poll_for_image_load, this, !0, 0, this.after_all_images_loaded) } else this.setup_form_events(), M.util.js_complete(this.pendingid);
            this.update_visibility_of_file_pickers() },
        after_all_images_loaded: function() { this.update_padding_sizes_all(), this.update_drag_instances(), this.reposition_drags_for_form(), this.set_options_for_drag_item_selectors(), this.setup_form_events(), e.later(500, this, this.reposition_drags_for_form, [], !0) },
        constrain_image_size: function(e, t) { var n = this.get("maxsizes")[t],
                r = Math.max(e.target.get("width") / n.width, e.target.get("height") / n.height);
            r > 1 && e.target.set("width", Math.floor(e.target.get("width") / r)), e.target.addClass("constrained"), e.target.detach("load", this.constrain_image_size) },
        load_drag_homes: function() { for (var e = 0; e < this.form.get_form_value("noitems", []); e++) this.load_drag_home(e) },
        load_drag_home: function(e) { var t = null; "image" === this.form.get_form_value("drags", [e, "dragitemtype"]) && (t = this.fp.file(this.form.to_name_with_index("dragitem", [e])).href), this.doc.add_or_update_drag_item_home(e, t, this.form.get_form_value("draglabel", [e]), this.form.get_form_value("drags", [e, "draggroup"])) },
        update_drag_instances: function() { for (var e = 0; e < this.form.get_form_value("nodropzone", []); e++) { var t = this.form.get_form_value("drops", [e, "choice"]); if (t !== "0" && this.doc.drag_item(e) === null) { var n = this.doc.clone_new_drag_item(e, t - 1);
                    n !== null && this.doc.draggable_for_form(n) } } },
        set_options_for_drag_item_selectors: function() { var t = { 0: "" }; for (var n = 0; n < this.form.get_form_value("noitems", []); n++) { var r = this.form.get_form_value("draglabel", [n]),
                    i = this.fp.file(this.form.to_name_with_index("dragitem", [n])); "image" === this.form.get_form_value("drags", [n, "dragitemtype"]) && i.name !== null ? t[n + 1] = n + 1 + ". " + r + " (" + i.name + ")" : r !== "" && (t[n + 1] = n + 1 + ". " + r) } for (n = 0; n < this.form.get_form_value("nodropzone", []); n++) { var s = e.one("#id_drops_" + n + "_choice"),
                    o = s.get("value");
                s.all("option").remove(!0); for (var u in t) { u = +u; var a = '<option value="' + u + '">' + t[u] + "</option>";
                    s.append(a); var f = s.one('option[value="' + u + '"]'); if (u === +o) f.set("selected", !0);
                    else if (u !== 0) { var l = e.one("#id_drags_" + (u - 1) + "_infinite");
                        l && !l.get("checked") && this.item_is_allocated_to_dropzone(u) && f.set("disabled", !0) } } } },
        stop_selector_events: function() { e.all("fieldset#id_dropzoneheader select").detachAll() },
        item_is_allocated_to_dropzone: function(t) { return e.all("fieldset#id_dropzoneheader select").some(function(e) { return Number(e.get("value")) === t }) },
        setup_form_events: function() { e.all("fieldset#id_dropzoneheader input").on("blur", function(e) { var t = e.target.getAttribute("name"),
                    n = this.form.from_name_with_index(t).indexes[0],
                    r = [this.form.get_form_value("drops", [n, "xleft"]), this.form.get_form_value("drops", [n, "ytop"])],
                    i = this.constrain_xy(n, r);
                this.form.set_form_value("drops", [n, "xleft"], i[0]), this.form.set_form_value("drops", [n, "ytop"], i[1]) }, this), e.all("fieldset#id_dropzoneheader select").on("change", function(e) { var t = e.target.getAttribute("name"),
                    n = this.form.from_name_with_index(t).indexes[0],
                    r = this.doc.drag_item(n);
                r !== null && r.remove(!0), this.draw_dd_area() }, this); for (var t = 0; t < this.form.get_form_value("noitems", []); t++) e.all("#fgroup_id_drags_" + t + " select.draggroup").on("change", this.redraw_dd_area, this), e.all("#fgroup_id_drags_" + t + " select.dragitemtype").on("change", this.redraw_dd_area, this), e.all("fieldset#draggableitemheader_" + t + ' input[type="text"]').on("blur", this.set_options_for_drag_item_selectors, this), e.all("fieldset#draggableitemheader_" + t + ' input[type="checkbox"]').on("change", this.set_options_for_drag_item_selectors, this);
            e.after(function(e) { var t = this.fp.name(e.id);
                t !== "bgimage" && this.doc.drag_items().remove(!0), this.draw_dd_area() }, M.form_filepicker, "callback", this) },
        redraw_dd_area: function() { this.doc.drag_items().remove(!0), this.draw_dd_area() },
        update_visibility_of_file_pickers: function() { for (var t = 0; t < this.form.get_form_value("noitems", []); t++) "image" === this.form.get_form_value("drags", [t, "dragitemtype"]) ? e.one("input#id_dragitem_" + t).get("parentNode").get("parentNode").setStyle("display", "block") : e.one("input#id_dragitem_" + t).get("parentNode").get("parentNode").setStyle("display", "none") },
        reposition_drags_for_form: function() { this.doc.drag_items().each(function(e) { var t = e.getData("draginstanceno");
                this.reposition_drag_for_form(t) }, this), M.util.js_complete(this.pendingid) },
        reposition_drag_for_form: function(e) { var t = this.doc.drag_item(e); if (null !== t && !t.hasClass("yui3-dd-dragging")) { var n = [this.form.get_form_value("drops", [e, "xleft"]), this.form.get_form_value("drops", [e, "ytop"])]; if (n[0] === "" && n[1] === "") { var r = t.getData("dragitemno");
                    t.setXY(this.doc.drag_item_home(r).getXY()) } else t.setXY(this.convert_to_window_xy(n)) } },
        set_drag_xy: function(e, t) {
            t = this.constrain_xy(e, this.convert_to_bg_img_xy(t)), this.form.set_form_value("drops", [e, "xleft"], Math.round(t[0])), this.form.set_form_value("drops", [e, "ytop"], Math.round(t[1]))
        },
        reset_drag_xy: function(e) { this.form.set_form_value("drops", [e, "xleft"], ""), this.form.set_form_value("drops", [e, "ytop"], "") },
        constrain_xy: function(e, t) { var n = this.doc.drag_item(e),
                r = Math.min(t[0], this.doc.bg_img().get("width") - n.get("offsetWidth")),
                i = Math.min(t[1], this.doc.bg_img().get("height") - n.get("offsetHeight")); return r = Math.max(r, 0), i = Math.max(i, 0), [r, i] },
        convert_to_bg_img_xy: function(e) { return [Number(e[0]) - this.doc.bg_img().getX() - 1, Number(e[1]) - this.doc.bg_img().getY() - 1] },
        form: { to_name_with_index: function(e, t) { var n = e; for (var r = 0; r < t.length; r++) n = n + "[" + t[r] + "]"; return n }, get_el: function(e, t) { var n = document.getElementById("mform1"); return n.elements[this.to_name_with_index(e, t)] }, get_form_value: function(e, t) { var n = this.get_el(e, t); return n.type === "checkbox" ? n.checked : n.value }, set_form_value: function(e, t, n) { var r = this.get_el(e, t);
                r.type === "checkbox" ? r.checked = n : r.value = n }, from_name_with_index: function(e) { var t = {};
                t.indexes = []; var n = e.indexOf("[");
                t.name = e.substring(0, n); while (n !== -1) { var r = e.indexOf("]", n + 1);
                    t.indexes.push(e.substring(n + 1, r)), n = e.indexOf("[", r + 1) } return t } },
        file_pickers: function() { var t, n; if (t === undefined) { t = {}, n = {}; var r = e.all("form.mform input.filepickerhidden");
                r.each(function(e) { t[e.get("value")] = e.get("name"), n[e.get("name")] = e.get("parentNode") }, this) } var i = { file: function(e) { var t = n[e],
                        r = t.one("div.filepicker-filelist a"); return r ? { href: r.get("href"), name: r.get("innerHTML") } : { href: null, name: null } }, name: function(e) { return t[e] } }; return i }
    }, { NAME: n, ATTRS: { maxsizes: { value: null } } }), M.qtype_ddlusher = M.qtype_ddlusher || {}, M.qtype_ddlusher.init_form = function(e) { return new r(e) }
}, "@VERSION@", { requires: ["moodle-qtype_ddlusher-dd", "form_filepicker"] });